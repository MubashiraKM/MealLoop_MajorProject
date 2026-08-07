# accounts/tasks.py
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import FoodItem
from celery import shared_task

@shared_task
def check_food_expiry_task():

    print("✅ Food expiry task is running at:", timezone.now())
    items = FoodItem.objects.all()

    for item in items:
        days_left = item.days_until_expiry()

        # Expiring in 6 days
        if days_left == 6 and not item.notified_6:
            subject = "Reminder: Your food item will expire in 6 days"
            html_content = render_to_string('emails/food_expiry_warning.html', {'item': item, 'days_left': days_left})
            msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [item.user.email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            item.notified_6 = True
            item.save()

        # Expiring in 2 days
        elif days_left == 2 and not item.notified_2:
            subject = "Alert: Your food item will expire soon (2 days left)"
            html_content = render_to_string('emails/food_expiry_urgent.html', {'item': item, 'days_left': days_left})
            msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [item.user.email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            item.notified_2 = True
            item.save()

        # Expired
        elif days_left <= 0 and not item.notified_expired:
            subject = "Notice: Your food item has expired"
            html_content = render_to_string('emails/food_expired.html', {'item': item})
            msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [item.user.email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            item.notified_expired = True
            item.save()

        # Update status
        item.update_status()
