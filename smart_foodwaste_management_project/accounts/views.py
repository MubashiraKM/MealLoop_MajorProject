from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Donation, DonationRequest

from django.core.cache import cache  
from django.shortcuts import render
from datetime import date
from .models import FoodItem  
from datetime import datetime

# ------------------ LOGIN/AUTHENTICATION ------------------


def login_view(request):
    return render(request, "accounts/login.html")


def logout_user(request):
    logout(request)
    messages.success(request, "Logged out successfully.")
    return redirect("login")


def register_view(request):
    if request.method == "POST":
        fname = request.POST.get("fName")
        lname = request.POST.get("lName")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=email).exists():
            messages.error(request, "Email already exists! Please use another one.")
            return render(request, "accounts/login.html", {'show_signin': False})

        user = User.objects.create_user(
            username=email,
            first_name=fname,
            last_name=lname,
            email=email,
            password=password,
        )
        messages.success(request, "Account created successfully! Please login.")
        return render(request, "accounts/login.html", {'show_signin': True})

    return render(request, "accounts/login.html", {'show_signin': False})


def login_user(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            return redirect("http://localhost:5173/index.html")
        else:
            # Show error below password field
            messages.error(request, "Invalid email or password")

            return render(request, 'accounts/login.html', {
                'login_error': 'Incorrect email or password.',
                'show_signin': True
            })

    # GET request → just show the sign-in form by default
    return render(request, 'accounts/login.html', {'show_signin': True})




# ------------------ DONATIONS ------------------
@login_required
def donation_index(request):
    return render(request, "accounts/index.html")


@login_required
def donation_form(request):
    return render(request, "accounts/donation_form.html")


# @login_required
# def submit_donation(request):
#     if request.method == 'POST':
#         Donation.objects.create(
#             donor=request.user,
#             full_name=request.POST.get('fullname'),
#             contact=request.POST.get('contact'),
#             address=request.POST.get('address'),
#             item_name=request.POST.get('item_name'),
#             food_type=request.POST.get('food_type'),
#             quantity=request.POST.get('quantity'),
#             instructions=request.POST.get('instructions'),
#             pickup_datetime=request.POST.get('pickup') or None,
#             drop_location=request.POST.get('location'),
#             consent=bool(request.POST.get('consent')),
#         )
#         messages.success(request, "Donation recorded successfully.")
#         return redirect('thankyou_page')
#     return redirect('donation_form')

@login_required
def submit_donation(request):
    if request.method == "POST":

        Donation.objects.create(
            donor=request.user,
            name=request.POST.get("name"),
            phone=request.POST.get("phone"),
            address=request.POST.get("address"),

            food_type=request.POST.get("food_type"),
            item_name=request.POST.get("item_name"),
            quantity=request.POST.get("quantity_val"),

            pickup_date=request.POST.get("pickup_datetime"),  # <-- FIXED
            pickup_datetime=request.POST.get("pickup_datetime"),  # stores the same value

            instructions=request.POST.get("instructions"),
            drop_location=request.POST.get("drop_location"),
            consent=True if request.POST.get("consent") else False,
        )

        messages.success(request, "Donation submitted successfully!")
        return redirect("thankyou_page")

    return redirect("donation_form")






@login_required
def thankyou_page(request):
    return render(request, "accounts/thankyou.html")


@login_required
def my_donations(request):
    donations = Donation.objects.filter(donor=request.user, is_deleted_by_donor=False)
    return render(request, "accounts/my_donations.html", {'donations': donations})


@login_required
@csrf_exempt
def delete_donation(request, donation_id):
    donation = get_object_or_404(Donation, id=donation_id, donor=request.user)

    if request.method == "POST":
        # Notify pending request receivers
        pending_requests = DonationRequest.objects.filter(donation=donation, status='pending')
        for req in pending_requests:
            req.status = 'rejected'
            req.save()

            # Send rejection email
            subject = 'Your Donation Request Rejected'
            context = {'donation': donation, 'receiver': req.receiver}
            html_message = render_to_string('emails/request_rejected.html', context)
            text_message = f'Your request for "{donation.item_name}" has been rejected.'
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[req.receiver.email],
            )
            email.attach_alternative(html_message, "text/html")
            email.send()

        donation.delete()
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "error": "Invalid request"}, status=400)


@login_required
def donation_listings(request):
    listings = Donation.objects.filter(
        status='available', is_deleted_by_donor=False
    ).exclude(donor=request.user)
    return render(request, "accounts/donation_listings.html", {'listings': listings})


# ------------------ REQUEST DONATION ------------------
@login_required
def request_donation(request, donation_id):
    donation = get_object_or_404(Donation, id=donation_id)

    if donation.donor == request.user:
        messages.error(request, "You cannot request your own donation.")
        return redirect('donation_listings')

    if DonationRequest.objects.filter(donation=donation, receiver=request.user).exists():
        messages.error(request, "You have already requested this donation.")
        return redirect('donation_listings')

    req = DonationRequest.objects.create(
        donation=donation,
        receiver=request.user,
        receiver_name = request.POST.get('receiver_name'),
        receiver_contact = request.POST.get('receiver_contact'),
    )

    donation.status = 'requested'
    donation.save()

    # Email to Donor
    subject = 'New Donation Request'
    context = {'donation': donation, 'receiver': request.user}
#     context = {
#     'donation': donation,
#     'receiver': request.user,
#     'request_obj': req
# }
    html_message = render_to_string('emails/request_received.html', context)
    text_message = f'Your donation "{donation.item_name}" has been requested by {request.user.get_full_name()}.'
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[donation.donor.email],
    )
    email.attach_alternative(html_message, "text/html")
    email.send()

    messages.success(request, "Request sent successfully!")
    return redirect('donation_listings')


# ------------------ MY REQUESTS ------------------
@login_required
def my_requests(request):
    pending = DonationRequest.objects.filter(receiver=request.user, status='pending')
    accepted = DonationRequest.objects.filter(receiver=request.user, status='accepted')
    rejected = DonationRequest.objects.filter(receiver=request.user, status='rejected')
    return render(request, "accounts/my_requests.html", {
        'pending_requests': pending,
        'accepted_requests': accepted,
        'rejected_requests': rejected
    })


@login_required
def delete_request(request, request_id):
    req = get_object_or_404(DonationRequest, id=request_id, receiver=request.user)
    if req.status == 'pending':
        req.donation.status = 'available'
        req.donation.save()
    req.delete()
    messages.success(request, "Request deleted.")
    return redirect('my_requests')


# ------------------ MANAGE REQUEST ------------------


@login_required
def manage_request(request, request_id, action):
    """Allows donor to accept or reject a donation request."""
    req = get_object_or_404(DonationRequest, id=request_id)
    donation = req.donation

    if donation.donor != request.user:
        messages.error(request, "Not authorized.")
        return redirect("donation_requests_for_my_listings")

    if req.status != "pending":
        messages.warning(request, "Request already processed.")
        return redirect("donation_requests_for_my_listings")

    # ----------------- ACCEPT REQUEST -----------------
    if action == "accept":
        req.status = "accepted"
        donation.status = "accepted"
        donation.save()
        req.save()

        # Reject other pending requests for same donation
        other_requests = DonationRequest.objects.filter(
            donation=donation, status="pending"
        ).exclude(id=req.id)
        other_requests.update(status="rejected")

        # Email to accepted receiver
        subject = "Your Donation Request Accepted"
        context = {"donation": donation, "receiver": req.receiver}
        html_message = render_to_string("emails/request_accepted.html", context)
        text_message = f'Your request for "{donation.item_name}" has been accepted.'

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[req.receiver.email],
        )
        email.attach_alternative(html_message, "text/html")
        email.send()

        # Email to donor with receiver details
        subject_donor = "Receiver Details for Your Donation"
        context_donor = {"donation": donation, "receiver": req.receiver}
        html_message_donor = render_to_string("emails/receiver_details.html", context_donor)
        text_message_donor = f'The receiver for your donation "{donation.item_name}" is {req.receiver.get_full_name()}.'

        email_donor = EmailMultiAlternatives(
            subject=subject_donor,
            body=text_message_donor,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[donation.donor.email],
        )
        email_donor.attach_alternative(html_message_donor, "text/html")
        email_donor.send()

        # Notify rejected users
        for r in other_requests:
            subject_reject = "Your Donation Request Rejected"
            context_reject = {"donation": donation, "receiver": r.receiver}
            html_message_reject = render_to_string("emails/request_rejected.html", context_reject)
            text_message_reject = f'Your request for "{donation.item_name}" has been rejected.'

            email_reject = EmailMultiAlternatives(
                subject=subject_reject,
                body=text_message_reject,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[r.receiver.email],
            )
            email_reject.attach_alternative(html_message_reject, "text/html")
            email_reject.send()

    # ----------------- REJECT REQUEST -----------------
    elif action == "reject":
        req.status = "rejected"
        req.save()

        # If no accepted request exists, mark donation as available again
        if not DonationRequest.objects.filter(donation=donation, status="accepted").exists():
            donation.status = "available"
            donation.save()

        # Email to rejected receiver
        subject = "Your Donation Request Rejected"
        context = {"donation": donation, "receiver": req.receiver}
        html_message = render_to_string("emails/request_rejected.html", context)
        text_message = f'Your request for "{donation.item_name}" has been rejected.'

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[req.receiver.email],
        )
        email.attach_alternative(html_message, "text/html")
        email.send()

    messages.success(request, f"Request {action}ed successfully.")
    return redirect("donation_requests_for_my_listings")


# ------------------ DONATION REQUESTS FOR MY LISTINGS ------------------
@login_required
def donation_requests_for_my_listings(request):
    requests = DonationRequest.objects.filter(donation__donor=request.user).select_related('donation', 'receiver')

    # Search and filter
    search_query = request.GET.get('search', '').strip()
    status_filter = request.GET.get('status', '').strip()
    date_filter = request.GET.get('date', '').strip()  # format YYYY-MM-DD

    if search_query:
        requests = requests.filter(donation__item_name__icontains=search_query)
    if status_filter:
        requests = requests.filter(status__iexact=status_filter)
    if date_filter:
        requests = requests.filter(donation__pickup_datetime__date=date_filter)

    # Prepare data (no pickup location)
    requests_data = []
    for req in requests:
        requests_data.append({
            'id': req.id,
            'donation_name': req.donation.item_name,
            'donation_date': req.donation.pickup_datetime,
            'receiver_name': req.receiver_name,
            'quantity': req.donation.quantity,
            'dropoff_location': req.donation.drop_location,
            'status': req.status
        })

    return render(request, "accounts/donation_requests_for_my_listings.html", {'requests': requests_data})


# ------------------ FOOD EXPIRY TRACKER ------------------


    # ------------------ DASHBOARD ------------------
@login_required
def tracker_dashboard(request):
    items = FoodItem.objects.filter(user=request.user).order_by('expiry_date')

    today = date.today()
    for item in items:
        if item.expiry_date:
            delta = (item.expiry_date - today).days
            item.days_left = delta if delta >= 0 else 0
            if delta < 0:
                item.status = "expired"
            elif delta <= 3:
                item.status = "expiring_soon"
            else:
                item.status = "fresh"
        else:
            item.days_left = None
            item.status = "unknown"

    context = {
        "user": request.user,
        "all_items": items,
        "total_items": items.count(),
        "fresh_count": sum(1 for i in items if i.status == "fresh"),
        "expiring_soon_count": sum(1 for i in items if i.status == "expiring_soon"),
        "expired_count": sum(1 for i in items if i.status == "expired"),
    }

    return render(request, "accounts/dashboard.html", context)


from datetime import datetime
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import FoodItem


@login_required
def add_food_item(request):
    if request.method == "POST":
        item_name = request.POST.get("item_name")
        category = request.POST.get("category")
        expiry_date_str = request.POST.get("expiry_date")
        quantity = request.POST.get("quantity")
        notes = request.POST.get("notes")

        #  Convert expiry_date string to date
        expiry_date = datetime.strptime(expiry_date_str, "%Y-%m-%d").date() if expiry_date_str else None

        if not item_name or not expiry_date:
            messages.error(request, "Item name and expiry date are required.")
            return redirect("tracker_dashboard")

        FoodItem.objects.create(
            user=request.user,
            item_name=item_name,
            category=category,
            expiry_date=expiry_date,
            quantity=quantity,
            notes=notes,
        )
        messages.success(request, "Item added successfully!")
        return redirect("tracker_dashboard")

    return redirect("tracker_dashboard")


@login_required
def edit_food_item(request, item_id):
    item = get_object_or_404(FoodItem, id=item_id, user=request.user)

    if request.method == "POST":
        item.item_name = request.POST.get("item_name")
        item.category = request.POST.get("category")
        expiry_date_str = request.POST.get("expiry_date")
        item.quantity = request.POST.get("quantity")
        item.notes = request.POST.get("notes")

        #  Convert expiry_date string to date
        if expiry_date_str:
            item.expiry_date = datetime.strptime(expiry_date_str, "%Y-%m-%d").date()

        item.save()
        messages.success(request, "Item updated successfully!")
        return redirect("tracker_dashboard")

    return redirect("tracker_dashboard")


# ------------------ DELETE ITEM ------------------
@login_required
def delete_food_item(request, item_id):
    item = get_object_or_404(FoodItem, id=item_id, user=request.user)
    item.delete()
    messages.success(request, "Item deleted successfully.")
    return redirect("tracker_dashboard")

