from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from user.models import Branch

User = get_user_model()


def confirm_organizer(value):
    user = User.objects.get(pk=value)
    if user.role == 0:
        raise ValidationError("The User Doesn't Have access to create Event")

CLUB_LENGTH = 70

def default_accepted_role():
    return [0]

class Event(models.Model):
    STATUS_CHOICES = (
        (1, 'Pending'),
        (2, 'Approved'),
        (3, 'Rejected'),
        (4, 'Completed'),
        (5, 'Cancel'),
        (6, 'Certified'),
        (7, 'Ongoing'),
    )
    ROLE_CHOICES = User.ROLE_CHOICE

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.PositiveIntegerField(choices=STATUS_CHOICES, default=1)
    organizer = models.ManyToManyField(User, related_name='event_organizer', blank=True)
    

    # this will only contain accepted participant
    accepted_participant = models.ManyToManyField(User, related_name='accepted_participant', blank=True)

    accepted_role =  models.JSONField(default=default_accepted_role)
    
    total_strength = models.PositiveIntegerField(null=True, blank=True)
    applied_participant = models.ManyToManyField(User, related_name='applied_participant', blank=True)
    fcfs = models.BooleanField(default=True)

    image = models.ImageField(upload_to='poster/')
    title = models.CharField(max_length=250)
    short_description = models.CharField(max_length=100)
    long_description = models.TextField(null=True, blank=True)
    club = models.CharField(max_length=CLUB_LENGTH)
    venue = models.CharField(blank=True, null=True, max_length=100)

    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    date = models.TextField(blank=True, null=True)
    time = models.TextField(blank=True, null=True)

    branch = models.ManyToManyField(Branch, blank=True)

    messages = models.JSONField(blank=True, null=True)  # [{'message':'', from:'', datetime:'', status:'Rejected}]
    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)
    require_number = models.BooleanField(default=False)

    # def clean(self, *args, **kwargs):
    #     cleanData = super().save(*args, **kwargs)
    #     for participant in self.accepted_participant.all():
    #         if not self.applied_participant.filter(pk=participant.pk).exists():
    #             raise ValidationError(f"{participant.full_name} ({participant.college_id}) is not in the applied participant List")
        
    def is_eligible_to_apply(self, user):
        if user.role not in self.accepted_role:
            self.eligible_message = f"{user.get_role_display()} can't apply to this Event"
            return False
        if not user.has_email():
            self.eligible_message = "Update email Id to Apply to any Event"
            return False
        if self.require_number and not user.has_phone():
            self.eligible_message = "Update Whatsapp Number to Apply to this Event"
            return False
        return True

    def __str__(self):
        return f"{self.title} ({self.owner.full_name})"

class Club(models.Model):
    abbreviation = models.CharField(max_length=10, null=True, blank=True)
    name = models.CharField(max_length=CLUB_LENGTH)

    def __str__(self):
        return self.name
