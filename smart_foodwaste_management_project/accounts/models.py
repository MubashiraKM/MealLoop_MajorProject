from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone



class Donation(models.Model):
    # donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    # full_name = models.CharField(max_length=255)
    # contact = models.CharField(max_length=100)
    # address = models.TextField()
    # item_name = models.CharField(max_length=255, default='Unknown Item')
    
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    item_name = models.CharField(max_length=200)
    food_type = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    pickup_date = models.DateTimeField()
    instructions = models.TextField(blank=True, null=True)
    consent = models.BooleanField(default=False)

    FOOD_TYPES = [
        ('vegetables', 'Vegetables'),
        ('fruits', 'Fruits'),
        ('cooked', 'Cooked Food'),
        ('others', 'Others'),
    ]
    food_type = models.CharField(max_length=50, choices=FOOD_TYPES)
    quantity = models.CharField(max_length=100)
    instructions = models.TextField(blank=True, null=True)
    
    pickup_datetime = models.DateTimeField(blank=True, null=True)
    drop_location = models.CharField(max_length=255, blank=True, null=True)
    
    consent = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=[
            ('available', 'Available'),
            ('requested', 'Requested'),
            ('accepted', 'Accepted'),
            ('completed', 'Completed'),
        ],
        default='available',
    )
    
    is_deleted_by_donor = models.BooleanField(default=False)  # Soft delete
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} ({self.food_type}) by {self.donor.get_full_name()} - {self.status}"


class DonationRequest(models.Model):
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name='requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests_made')
    
    receiver_name = models.CharField(max_length=255)
    receiver_contact = models.CharField(max_length=100)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('accepted', 'Accepted'),
            ('rejected', 'Rejected'),
        ],
        default='pending',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.receiver_name} for {self.donation.item_name} ({self.status})"


class FoodItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='food_items')
    item_name = models.CharField(max_length=255)
    expiry_date = models.DateField()
    quantity = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    STATUS_CHOICES = [
        ('fresh', 'Fresh'),
        ('expiring_soon', 'Expiring Soon'),
        ('very_close_to_expiry', 'Very Close to Expiry'),
        ('expired', 'Expired'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='fresh')

    
    notified_6 = models.BooleanField(default=False)
    notified_2 = models.BooleanField(default=False)
    notified_expired = models.BooleanField(default=False)

    class Meta:
        ordering = ['expiry_date']

    def __str__(self):
        return f"{self.item_name} - {self.user.username} (Expires: {self.expiry_date})"

    def days_until_expiry(self):
        today = timezone.now().date()
        return (self.expiry_date - today).days

    def update_status(self):
        days_left = self.days_until_expiry()
        if days_left < 0:
            self.status = 'expired'
        elif days_left <= 2:
            self.status = 'very_close_to_expiry'
        elif days_left <= 6:
            self.status = 'expiring_soon'
        else:
            self.status = 'fresh'

    def save(self, *args, **kwargs):

        self.update_status()
        super().save(*args, **kwargs)
