from rest_framework import serializers
from .models import Event, Club, EventParticipant
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import user.serializers as user_serializer
from django.db import transaction
from .messages import Validation

message = Validation()

User = get_user_model()


class EventCardSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
            'club',
            'image',
            'short_description',
            'date',
        ]

    def get_date(self, obj):
        format = "%d %b '%y"
        if obj.start_date is None or obj.end_date is None:
            return ''
        return f"{obj.start_date.strftime(format)} - {obj.end_date.strftime(format)}"


class BaseEventDetailSerializer(serializers.ModelSerializer):
    ROLE_CHOICES = dict(Event.ROLE_CHOICES)
    accepted_role = serializers.SerializerMethodField()
    is_eligible = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    long_description = serializers.SerializerMethodField()

    organizer = user_serializer.OrganizerSerializer(many=True)
    owner = user_serializer.OwnerSerializer()

    applied_count = serializers.SerializerMethodField()
    accepted_count = serializers.SerializerMethodField()

    certificate = serializers.SerializerMethodField()

    branch = user_serializer.BranchSerializer(many=True)
    total_strength = serializers.SerializerMethodField()
    club = serializers.SerializerMethodField()
    status = serializers.CharField(source="get_status_display")

    def get_is_eligible(self, obj):
        user = self.context.get('request').user
        if user.role in obj.accepted_role:
            return True
        return False

    def get_accepted_role(self, obj):
        rv = []
        for role in obj.accepted_role:
            if role in self.ROLE_CHOICES:
                rv.append(self.ROLE_CHOICES[role])
        return rv

    def __new__(cls, *args, **kwargs):

        if not hasattr(cls, 'Meta'):
            cls.Meta = cls.BaseMeta
        else:
            Meta = cls.Meta
            if hasattr(cls.BaseMeta, 'fields'):
                if hasattr(Meta, 'fields'):
                    cls.Meta.fields += cls.BaseMeta.fields
                else:
                    cls.Meta.fields = cls.BaseMeta.fields

            if hasattr(cls.BaseMeta, 'exclude'):
                if hasattr(Meta, 'exclude'):
                    cls.Meta.exclude += cls.BaseMeta.exclude
                else:
                    cls.Meta.exclude = cls.BaseMeta.exclude

            if not hasattr(Meta, 'model') and hasattr(cls.BaseMeta, 'model'):
                cls.Meta.model = cls.BaseMeta.model

        return super().__new__(cls)

    class BaseMeta:
        model = Event
        fields = [
            'is_eligible',
            'accepted_role',
            'pk',
            "date",
            "long_description",
            "owner",
            'applied_count',
            'accepted_count',
            "organizer",
            "branch",
            "accepted_count",
            "total_strength",
            "image",
            "title",
            "short_description",
            "club",
            "venue",
            "start_date",
            "end_date",
            "time",
            "fcfs",
            'status',
            'certificate',
            'vc_verified',
        ]
        additional_fields = []
        fields += additional_fields

    def get_certificate(self, obj):
        user = self.context.get('request').user
        request = self.context.get('request')
        if obj.involved_user.filter(user_id=user.pk).exists():
            event_participant = obj.involved_user.get(user=user)
            if event_participant.certificate:
                return request.build_absolute_uri(event_participant.certificate.url)
        return None

    def get_total_strength(self, obj):
        return obj.total_strength or 0

    def get_applied_count(self, obj):
        return obj.applied_participant.count() + obj.accepted_participant.count() + obj.declined_participant.count()

    def get_accepted_count(self, obj):
        return obj.accepted_participant.count()

    def get_club(self, obj):
        return {'name': obj.club}

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     owner_id = representation.get('owner').get('college_id')
    #     organizers = representation.get('organizer')
    #     representation['organizer'] = [i for i in organizers if i.get('college_id') != owner_id]
    #     return representation

    def get_long_description(self, obj):
        if obj.long_description == '':
            return obj.short_description
        return obj.long_description

    def get_date(self, obj):
        format = "%d %b '%y"
        if obj.start_date is None or obj.end_date is None:
            return ''
        return f"{obj.start_date.strftime(format)} - {obj.start_date.strftime(format)}"


class EventDetailSerializerStudent(BaseEventDetailSerializer):
    is_applied = serializers.SerializerMethodField()
    is_accepted = serializers.SerializerMethodField()
    is_declined = serializers.SerializerMethodField()

    def get_is_declined(self, obj):
        request = self.context.get('request')
        if obj.declined_participant.filter(user_id=request.user.pk).exists():
            return True
        return False

    def get_is_applied(self, obj):
        request = self.context.get('request')
        if (obj.applied_participant.filter(user_id=request.user.pk).exists() or
                obj.accepted_participant.filter(user_id=request.user.pk).exists() or
                obj.declined_participant.filter(user_id=request.user.pk).exists()):
            return True
        return False

    def get_is_accepted(self, obj):
        request = self.context.get('request')

        if obj.accepted_participant.filter(user_id=request.user.pk).exists():
            return True
        return False

    class Meta:
        fields = [
            'is_applied',
            'is_accepted',
            'is_declined',
        ]


class EventDetailSerializerHodDeanVC(EventDetailSerializerStudent):
    class Meta:
        fields = [
            'is_applied',
            'is_accepted',
            'is_declined',
            'hod_verified',
            'dean_verified',
            'rejected',
            'report_verified',
            'report',
        ]


class EventDetailSerializerOrganizer(EventDetailSerializerStudent):
    participant = serializers.SerializerMethodField()
    declined_count = serializers.SerializerMethodField()
    certified_quantity = serializers.SerializerMethodField()

    def get_certified_quantity(self, obj):
        count = 0
        for participant in obj.accepted_participant:
            if participant.certificate:
                count += 1
        return count

    def get_declined_count(self, obj):
        return obj.declined_participant.count()

    def get_participant(self, obj):
        participant_list = []

        for participant in obj.applied_participant.union(obj.accepted_participant).union(obj.declined_participant):
            status = 0
            if obj.accepted_participant.filter(user_id=participant.user.pk).exists():
                status = 1
            if obj.declined_participant.filter(user_id=participant.user.pk).exists():
                status = -1
            user = participant.user
            participant_list.append({
                "name": user.full_name,
                "role": user.get_role_display(),
                "college_id": user.college_id,
                "pk": user.pk,
                "status": status
            })
        return participant_list

    class Meta:
        fields = [
            'participant',
            'declined_count',
            'rejected',
            'hod_verified',
            'dean_verified',
            'report_verified',
            'history',
            'report',
            'certified_quantity'
        ]


class EventCreateSerializer(serializers.ModelSerializer):
    msg = message.event
    pk = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = [
            'pk',
            'image',
            'title',
            'short_description',
            'long_description',
            'club',
            'venue',
            'start_date',
            'end_date',
            'date',
            'time',
            'branch',
            'fcfs',
            'total_strength',
        ]

    def to_representation(self, instance):
        # Override to_representation method to customize serialized output
        representation = super().to_representation(instance)
        # representation['organizer'] = user_serializer.OrganizerSerializer(
        #     instance.organizer.all(), many=True).data
        return representation

    def save(self, *args, **kwargs):
        event = super().save(*args, **kwargs)
        organizer_list = self.context['request'].data.getlist('organizer[]')
        existing_participants = EventParticipant.objects.filter(
            event=event).exclude(user__pk__in=organizer_list).exclude(owner=True)
        existing_participants.delete()
        new_participants = [EventParticipant(
            event=event, user_id=user_pk, organizer=True, status='0') for user_pk in organizer_list]
        with transaction.atomic():
            EventParticipant.objects.bulk_create(
                new_participants, ignore_conflicts=True)
        return event

    def validate_title(self, value):
        value = value.strip()
        value = value.title()
        if value == '':
            raise serializers.ValidationError(self.msg.title)
        return value


class EventUpdateSerializer(EventCreateSerializer):
    def save(self, **kwargs):
        instance = super().save(**kwargs)
        instance.clear_timeline()  # Run create_timeline() function
        instance.rejected = False
        instance.status = 1
        instance.save()

        return instance


class EventProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title',
            'applicationStatus',
            'eventStatus',
            'link',
            'club',  # Club name
            'short_desc',
            'status',
            'failed',  # -1 or (progress + 1)
            'failedLabel',
        ]

    def get_status(self, obj):
        progress = 0
        if obj.status == 5:  # completed
            progress = 5
        if obj.status == 6:  # Reported Submitted
            progress = 6
        if obj.status == 7:  # Report Approved
            progress = 7
        if obj.status == 8:  # Certified
            progress = 8


class EventRegisterdCompletedPending(serializers.ModelSerializer):
    applicationStatus = serializers.SerializerMethodField()
    eventStatus = serializers.SerializerMethodField()

    # def to_representation(self, instance):

    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
            'applicationStatus',
            'club',
            'eventStatus',
            'history'
        ]

    def get_eventStatus(self, obj):
        user = self.context.get('request').user
        status = obj.status
        if user.role == 0:
            if status > 5:
                return 'Completed'
        return obj.get_status_display()

    def get_applicationStatus(self, obj):
        request = self.context.get('request')
        user_id = request.user.pk
        if obj.declined_participant.filter(user_id=user_id).exists():
            return 'Rejected'
        elif obj.accepted_participant.filter(user_id=user_id).exists():
            return 'Accepted'
        elif obj.applied_participant.filter(user_id=user_id).exists():
            return "Pending"
        else:
            return ""


class EventOrganizer(EventRegisterdCompletedPending):
    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
            'applicationStatus',
            'club',
            'eventStatus',
            'history'
        ]


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['abbreviation', 'name']


class EventParticipantList(serializers.ModelSerializer):
    name = serializers.CharField(source='user.full_name', read_only=True)
    register_number = serializers.CharField(
        source='user.college_id', read_only=True)
    batch = serializers.CharField(source='user.batch', read_only=True)
    branch = serializers.CharField(source='user.branch.name', read_only=True)
    event_name = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = EventParticipant
        fields = [
            'event_name',
            'register_number',
            'name',
            'batch',
            'branch',
            'certificate'
        ]


class EventTimeLine(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['history']
