from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from user.models import Branch
from .fakequeryset import FakeQuerySet

User = get_user_model()


def confirm_organizer(value):
    user = User.objects.get(pk=value)
    if user.role == 0:
        raise ValidationError("The User Doesn't Have access to create Event")

CLUB_LENGTH = 70

def default_accepted_role():
    return [0]

class EventParticipant(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    STATUS_CHOICES = (
        ('0', 'Not Applicable'),
        ('1', 'Declined'),
        ('2', 'Applied'),
        ('3', 'Accepted'),
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='2')
    owner = models.BooleanField(default=False)
    organizer = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.owner or self.organizer:
            self.status = '0'
        if self.owner:
            self.organizer = False
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('event', 'user')

class Event(models.Model):
    STATUS_CHOICES = (
        (1, 'Pending'),
        (2, 'Approved'),
        (3, 'Rejected'),
        (4, 'Displayed'),
        (5, 'Completed'),
        (6, 'Report Submitted'),
        (7, 'Report Approved'),
        (8, 'Certified'),
        (9, 'Canceled'),
    )
    ROLE_CHOICES = User.ROLE_CHOICE

    status = models.PositiveIntegerField(choices=STATUS_CHOICES, default=1)

    # this will only contain accepted participant
    participants = models.ManyToManyField(User, through='EventParticipant', blank=True)

    accepted_role =  models.JSONField(default=default_accepted_role)
    
    total_strength = models.PositiveIntegerField(null=True, blank=True)
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

    history = models.JSONField(blank=True, null=True)

    '''
    {
        0: {datetime:'', status: 1},
        1: {datetime:'', status: 1},
        2: {datetime:'', status: 1},
        3: {datetime:'', status: 1},
        4: {datetime:'', status: 1},
        5: {datetime:'', status: 0, error_message: ''},
    }
    '''

    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)
    require_number = models.BooleanField(default=False)

    def get_participant_data(self):
        if not hasattr(self, '_participants_dict'):
            data = {
                'accepted': FakeQuerySet(),
                'applied': FakeQuerySet(),
                'declined': FakeQuerySet(),
                'owner': None,
                'organizer': FakeQuerySet(),
            }
            for participant in self.participants.through.objects.filter(event=self.pk):
                if participant.status == '3':
                    data['accepted'].add(participant.user)
                elif participant.status == '2':
                    data['applied'].add(participant.user)
                elif  participant.status == '1':
                    data['declined'].add(participant.user)
                elif participant.owner:
                    data['owner'] = participant.user
                elif participant.organizer:
                    data['organizer'].add(participant.user)
            
            self._participants_dict = data


        return self._participants_dict

    @property
    def accepted_participant(self):
        return self.get_participant_data()['accepted']

    @property
    def applied_participant(self):
        return self.get_participant_data()['applied']

    @property
    def declined_participant(self):
        return self.get_participant_data()['declined']
    
    @property
    def owner(self):
        return self.get_participant_data()['owner']
    
    @property
    def organizer(self):
        return self.get_participant_data()['organizer']

    def is_organizer(self, user):
        return self.organizer.filter(user.pk).exists()

    def is_owner(self, user):
        if self.owner is None:
            return False
        return self.owner.pk == user.pk 
    
    # def clean(self, *args, **kwargs):
    #     cleanData = super().save(*args, **kwargs)
    #     for participant in self.accepted_participant.all():
    #         if not self.applied_participant.filter(pk=participant.pk).exists():
    #             raise ValidationError(f"{participant.full_name} ({participant.college_id}) is not in the applied participant List")

    def register_participant(self, user):
        message = self.is_eligible_to_apply(user)
        if message is True:
            status = '3' if self.fcfs else '2'
            self.participants.add(user, through_defaults={'status': status})
            return [True, 'You are Enrolled to the Event' if self.fcfs else 'Event Application Successfull!!']
        return [False, message]

    def is_eligible_to_apply(self, user):
        if user.role not in self.accepted_role:
            return f"{user.get_role_display()} can't apply to this Event"
        if self.accepted_participant.count() > self.total_strength:
            return "There is no more Seat"
        if self.is_organizer(user):
            return "Organizer Cannot Apply for the Event"
        if self.is_owner(user):
            return 'Owner cannot Apply for the Event'
        if not user.has_email():
            return "Update email Id to Apply to any Event"
        if self.require_number and not user.has_phone():
            return "Update Whatsapp Number to Apply to this Event"
        return True

    def set_owner(self, user):
        """
        Sets the owner of the event. If the owner already exists, it will be updated.
        """
        # Check if an owner already exists
        try:
            owner = EventParticipant.objects.get(event=self, owner=True)
            # Update the existing owner
            if owner.user != user:
                owner.user = user
                owner.save()
        except EventParticipant.DoesNotExist:
            # If no owner exists, create a new owner entry
            owner = EventParticipant(event=self, user=user, owner=True)
            owner.save()
    

    def __str__(self):
        return f"{self.title} ({self.owner})"

class Club(models.Model):
    abbreviation = models.CharField(max_length=10, null=True, blank=True)
    name = models.CharField(max_length=CLUB_LENGTH)

    def __str__(self):
        return self.name