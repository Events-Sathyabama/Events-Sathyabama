from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from user.models import Branch
from .fakequeryset import FakeQuerySet

from django.utils import timezone
import os
from .utils import compress
from .messages import Validation

event = Validation().event()

User = get_user_model()


def confirm_organizer(value):
    user = User.objects.get(pk=value)
    if user.role == 0:
        raise ValidationError(event.non_organizer_forbidden)


def event_certificate_upload_path(instance, filename):
    # Construct the file path based on the event ID
    event_id = str(instance.event_id)
    return os.path.join('certs', event_id, filename)


CLUB_LENGTH = 70


def default_accepted_role():
    return [0]


def FileToLarge(value):
    size_in_mb = 10
    limit = size_in_mb * 1024 * 1024
    if value.size > limit:
        raise ValidationError(event.report_file_limit.format(size_in_mb))


class EventParticipant(models.Model):
    STATUS_CHOICES = (
        ('0', 'Not Applicable'),
        ('1', 'Declined'),
        ('2', 'Applied'),
        ('3', 'Accepted'),
    )

    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='2')
    owner = models.BooleanField(default=False)
    organizer = models.BooleanField(default=False)
    certificate = models.ImageField(
        upload_to=event_certificate_upload_path, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.certificate:
            cert = compress(self.certificate)
            self.certificate = cert
        if self.owner or self.organizer:
            self.status = '0'
        if self.owner:
            self.organizer = False
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('event', 'user')


class TimeLineStatus:
    not_visited = 0
    ongoing = 1
    completed = 2
    rejected = -1


def default_history(user):
    title = event.Timeline()

    return [
        {
            'user': None,
            'success_title': title.title_created,
            'failure_title': title.failed_title_created,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited
        },
        {
            'user': None,
            'success_title': title.title_hod,
            'failure_title': title.failed_title_hod,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_dean,
            'failure_title': title.failed_title_dean,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_vc,
            'failure_title': title.failed_title_vc,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_display,
            'failure_title': title.failed_title_display,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_ongoing,
            'failure_title': title.failed_title_ongoing,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_completed,
            'failure_title': title.failed_title_completed,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_report_uploaded,
            'failure_title': title.failed_title_report_uploaded,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_report_approved,
            'failure_title': title.failed_title_report_approved,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
        {
            'user': None,
            'success_title': title.title_certified,
            'failure_title': title.failed_title_certified,
            'message': '',
            'date': None,
            'status': TimeLineStatus.not_visited,
        },
    ]


class Event(models.Model):
    STATUS_CHOICES = (
        (1, 'Pending'),
        (2, 'Displayed'),
        (3, 'Completed'),
        (4, 'Report Submitted'),
        (5, 'Report Approved'),
        (6, 'Certified'),
    )
    ROLE_CHOICES = User.ROLE_CHOICE

    status = models.PositiveIntegerField(choices=STATUS_CHOICES, default=1)

    # this will only contain accepted participant
    participants = models.ManyToManyField(
        User, through='EventParticipant', blank=True)

    accepted_role = models.JSONField(default=default_accepted_role)

    total_strength = models.PositiveIntegerField(null=True, blank=True)
    fcfs = models.BooleanField(default=True)

    image = models.ImageField(upload_to='poster/', max_length=500)
    title = models.CharField(max_length=250)
    short_description = models.CharField(max_length=100)
    long_description = models.TextField(null=True, blank=True)
    club = models.CharField(max_length=CLUB_LENGTH)
    venue = models.CharField(blank=True, null=True, max_length=100)

    start_date = models.DateField()
    end_date = models.DateField()
    date = models.TextField(blank=True, null=True)
    time = models.TextField(blank=True, null=True)

    report = models.FileField(null=True, blank=True, validators=[FileToLarge])

    branch = models.ManyToManyField(Branch, blank=True)

    history = models.JSONField(blank=True, null=True)

    hod_verified = models.BooleanField(default=False)
    dean_verified = models.BooleanField(default=False)
    vc_verified = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    report_verified = models.BooleanField(default=False)
    require_number = models.BooleanField(default=False)
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

    def create_timeline(self, level, user, msg='', status=0):
        if level < 0 or level > 9:
            return False
        self.history[level]['user'] = user
        self.history[level]['message'] = msg
        self.history[level]['status'] = status
        self.history[level]['date'] = timezone.now().isoformat()
        if status == TimeLineStatus.completed and level + 1 < 10:
            self.history[level + 1]['status'] = TimeLineStatus.ongoing
        return True

    def clear_timeline(self):
        for history in self.history:
            if history['status'] == TimeLineStatus.rejected:
                history['status'] = TimeLineStatus.ongoing
                history['date'] = None
                history['message'] = ''
                history['user'] = None

    @property
    def no_of_certificate(self):
        self.get_participant_data()

    def get_participant_data(self):
        if not hasattr(self, '_participants_dict'):
            all_participant = EventParticipant.objects.select_related(
                'user').filter(event=self.pk)
            data = {
                'accepted': FakeQuerySet(Event, []),
                'applied': FakeQuerySet(Event, []),
                'declined': FakeQuerySet(Event, []),
                'owner': None,
                'organizer': FakeQuerySet(Event, []),
                'involved_user': FakeQuerySet(Event, []),
                'all_participant': FakeQuerySet(Event, []),
            }

            for participant in all_participant:
                if participant.status == '3':
                    data['accepted'].data.append(participant)
                    data['all_participant'].data.append(participant)
                elif participant.status == '2':
                    data['applied'].data.append(participant)
                    data['all_participant'].data.append(participant)
                elif participant.status == '1':
                    data['declined'].data.append(participant)
                    data['all_participant'].data.append(participant)
                if participant.owner:
                    data['owner'] = participant.user
                if participant.organizer:
                    data['organizer'].data.append(participant)
                data['involved_user'].data.append(participant)

            self._participants_dict = data

        return self._participants_dict

    @property
    def all_participant(self):
        return self.get_participant_data()['all_participant']

    @property
    def involved_user(self):
        return self.get_participant_data()['involved_user']

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
        return self.organizer.filter(user_id=user.pk).exists()

    def is_owner(self, user):
        if self.owner is None:
            return False
        return self.owner.pk == user.pk

    # def clean(self, *args, **kwargs):
    #     cleanData = super().save(*args, **kwargs)
    #     for participant in self.accepted_participant.all():
    #         if not self.applied_participant.filter(pk=participant.pk).exists():
    #             raise ValidationError(f"{participant.full_name} ({participant.college_id}) is not in the applied participant List")

    def save(self, *args, **kwargs):
        image = compress(self.image)
        self.image = image
        if self.pk is None or self.history is None:
            self.history = default_history(self.owner)

        super().save(*args, **kwargs)

    def register_participant(self, user):
        message = self.is_eligible_to_apply(user)
        if message is True:
            status = '3' if self.fcfs else '2'
            self.participants.add(user, through_defaults={'status': status})
            return [True, event.register_participant_fcfs_true if self.fcfs else event.register_participant_fcfs_false]
        return [False, message]

    def is_eligible_to_apply(self, user):
        if user.role not in self.accepted_role:
            return event.not_open_to_this_role.format(user.get_role_display())
        if self.accepted_participant.count() >= self.total_strength:
            return event.strength_full
        if self.is_organizer(user):
            return event.not_open_to_organizer
        if self.is_owner(user):
            return event.not_open_to_owner
        if not user.has_email():
            return event.email_required
        if self.require_number and not user.has_phone():
            return event.whatsapp_required
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
