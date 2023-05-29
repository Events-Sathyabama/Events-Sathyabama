from rest_framework import serializers
from .models import Event, Club
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import user.serializers as user_serializer

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

    date = serializers.SerializerMethodField()
    long_description = serializers.SerializerMethodField()

    organizer = user_serializer.OrganizerSerializer(many=True)
    owner = user_serializer.OrganizerSerializer()

    applied_count = serializers.SerializerMethodField()
    accepted_count = serializers.SerializerMethodField()
    
    certificate = serializers.SerializerMethodField()


    branch = user_serializer.BranchSerializer(many=True)
    total_strength = serializers.SerializerMethodField()
    club = serializers.SerializerMethodField()
    status = serializers.CharField(source="get_status_display")

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
            'vc_verified'

        ]
        additional_fields = []
        fields += additional_fields

    def get_certificate(self, obj):
        user = self.context.get('request').user
        if obj.involved_user.filter(pk=user.pk).exists():
            event_participant = obj.involved_user.get(user.pk)
            if event_participant.certificate:
                return event_participant.certificate
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
        if obj.declined_participant.filter(pk=request.user.pk).exists():
            return True
        return False

    def get_is_applied(self, obj):
        request = self.context.get('request')
        if (obj.applied_participant.filter(pk=request.user.pk).exists() or
            obj.accepted_participant.filter(pk=request.user.pk).exists() or
                obj.declined_participant.filter(pk=request.user.pk).exists()):
            return True
        return False

    def get_is_accepted(self, obj):
        request = self.context.get('request')

        if obj.accepted_participant.filter(pk=request.user.pk).exists():
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
            'report_verified'
        ]

class EventDetailSerializerOrganizer(EventDetailSerializerStudent):
    approval_message = serializers.SerializerMethodField()
    participant = serializers.SerializerMethodField()
    accepted_role = serializers.SerializerMethodField()
    declined_count = serializers.SerializerMethodField()

    def get_approval_message(self, obj):
        if obj.history is None:
            return []
        return obj.history

    def get_accepted_role(self, obj):
        rv = []
        for role in obj.accepted_role:
            if role in self.ROLE_CHOICES:
                rv.append(self.ROLE_CHOICES[role])
        return rv

    def get_declined_count(self, obj):
        return obj.declined_participant.count()

    def get_participant(self, obj):
        participant_list = []

        for participant in obj.applied_participant.union(obj.accepted_participant).union(obj.declined_participant):
            status = 0
            if obj.accepted_participant.filter(pk=participant.pk).exists():
                status = 1
            if obj.declined_participant.filter(pk=participant.pk).exists():
                status = -1

            participant_list.append({
                "name": participant.full_name,
                "role": participant.get_role_display(),
                "college_id": participant.college_id,
                "pk": participant.pk,
                "status": status
            })
        return participant_list

    class Meta:
        fields = [
            'approval_message',
            'participant',
            'accepted_role',
            'declined_count',
            'rejected',
            'hod_verified',
            'dean_verified',
            'report_verified',
        ]


class EventCreateSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
    organizer = user_serializer.OrganizerSerializer(many=True)

    class Meta:
        model = Event
        fields = [
            'pk',
            'organizer',
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

    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)

    def to_representation(self, instance):
        # Override to_representation method to customize serialized output
        representation = super().to_representation(instance)
        # representation['organizer'] = user_serializer.OrganizerSerializer(
        #     instance.organizer.all(), many=True).data
        return representation

    def validate_title(self, value):
        value = value.strip()
        value = value.title()
        if value == '':
            raise serializers.ValidationError('Title Cannot be Blank')
        return value


class EventUpdateSerializer(EventCreateSerializer):
    pass


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


class EventRegisterdCompleted(serializers.ModelSerializer):
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
            'eventStatus'
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
        if obj.declined_participant.filter(pk=user_id).exists():
            return 'Rejected'
        elif obj.accepted_participant.filter(pk=user_id).exists():
            return 'Accepted'
        elif obj.applied_participant.filter(pk=user_id).exists():
            return "Pending"
        else:
            return ""



class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['abbreviation', 'name']
