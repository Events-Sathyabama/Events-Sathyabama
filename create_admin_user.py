from django.contrib.auth import get_user_model
from django.core.management import call_command
import os
import django
import time
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'event_management.settings')
django.setup()

User = get_user_model()
if not User.objects.filter(college_id='-1').exists():
    call_command('createsuperuser', interactive=False, college_id='-1',
                 email='aryanamish385@gmail.com', role=4)
else:
    print("Admin User Already Exists with -1")
if not User.objects.filter(college_id='-2').exists():
    call_command('createsuperuser', interactive=False, college_id='-2',
                 email='bsuryakumar03@gmail.com', role=4)
else:
    print("Admin User Already Exists with -2")
# User()
