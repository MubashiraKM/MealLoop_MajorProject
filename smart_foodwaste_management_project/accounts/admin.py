from django.contrib import admin
from .models import FoodItem, Donation, DonationRequest

@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'expiry_date', 'user_email', 'status', 'notification_status', 'created_at']

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

    def notification_status(self, obj):
        statuses = []
        if obj.notified_6:
            statuses.append('6 days')
        if obj.notified_2:
            statuses.append('2 days')
        if obj.notified_expired:
            statuses.append('Expired')
        return ', '.join(statuses) if statuses else 'None'
    notification_status.short_description = 'Notifications Sent'


admin.site.register(Donation)
admin.site.register(DonationRequest)
