from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from datetime import timedelta
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_foodwaste_management_project.settings')

app = Celery('smart_foodwaste_management_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# ✅ Correct beat schedule
app.conf.beat_schedule = {
    'check-food-expiry-task': {
        'task': 'accounts.tasks.check_food_expiry_task',
        # 'schedule': timedelta(minutes=1),  # every 1 min for testing
        
        'schedule': crontab(hour=9, minute=0),  # every day at 9 AM
    },
}
