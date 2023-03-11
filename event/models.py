from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from user.models import Branch

User = get_user_model()


def confirm_organizer(value):
    user = User.objects.get(pk=value)
    if user.role == 0:
        raise ValidationError("The User Doesn't Have access to create Event")


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
    organizer = models.ManyToManyField(User, limit_choices_to={'role__in': [0, 1, 2]})
    status = models.PositiveIntegerField(choices=STATUS_CHOICES, default=1)

    participant = models.JSONField(blank=True, null=True)
    # [
    #   {
    #       'reg_no': 40110122,
    #       'name': 'Aryan Amish',
    #       'dept': 'CSE',
    #   }
    # ]
    image = models.ImageField(upload_to='poster/')
    title = models.CharField(max_length=250)
    short_description = models.CharField(max_length=30)
    long_description = models.TextField(null=True, blank=True)
    club = models.CharField(max_length=70)
    venue = models.CharField(blank=True, null=True, max_length=100)

    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    date = models.TextField(blank=True, null=True)
    time = models.TextField(blank=True, null=True)

    branch = models.ForeignKey(Branch, on_delete=models.DO_NOTHING, blank=True, null=True)

    messages = models.JSONField(blank=True, null=True)   # [{'message':'', from:'', datetime:'', status:'Rejected}]
    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.title