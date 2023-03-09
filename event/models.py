from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
User = get_user_model()


class Event(models.Model):
    STATUS_CHOICES = (
        (1, 'Pending'),
        (2, 'Approved'),
        (3, 'Rejected'),
        (4, 'Complete'),
        (5, 'Cancel'),
        (6, 'Certified'),
        (7, 'Ongoing'),
    )
    organizer = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    status = models.PositiveIntegerField(choices=STATUS_CHOICES)

    image = models.ImageField()
    title = models.CharField(max_length=250)
    description = models.TextField()
    venue = models.CharField(max_length=100)

    duration = models.PositiveIntegerField(default=1)
    event_date = models.JSONField()

    branch = models.CharField()

    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)
