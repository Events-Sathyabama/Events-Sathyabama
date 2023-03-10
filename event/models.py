from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from user.models import Branch

User = get_user_model()


def confirm_organizer(value):
    user = User.objects.get(pk=value)
    # if user.role.name == 'student':
    #     raise ValidationError("The User Dosen't Have access to create Event")


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
    organizer = models.ForeignKey(User, on_delete=models.DO_NOTHING, validators=[confirm_organizer])
    status = models.PositiveIntegerField(choices=STATUS_CHOICES)

    image = models.ImageField(blank=True)
    title = models.CharField(max_length=250)
    short_description = models.CharField(max_length=30)
    long_description = models.TextField()
    club = models.CharField(max_length=70)
    venue = models.CharField(blank=True, max_length=100)

    date = models.TextField()
    time = models.TextField()
    """
    [
        {date:'', start_time:'', end_time: ''}
    ]
    """

    branch = models.ForeignKey(Branch, on_delete=models.DO_NOTHING)

    messages = models.JSONField(blank=True, null=True)   # [{'message':'', from:'', datetime:'', status:'Rejected}]
    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.title