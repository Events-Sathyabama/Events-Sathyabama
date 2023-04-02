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
    branch = user_serializer.BranchSerializer(many=True)
    owner = user_serializer.OrganizerSerializer()
    applied_count = serializers.SerializerMethodField()
    accepted_count = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
            'owner',
            'club',
            'image',
            'organizer',
            'short_description',
            'long_description',
            'date',
            'time',
            'venue',
            'branch',
            'start_date',
            'end_date',
            'fcfs',
            'hod_verified',
            'dean_verified',
            'vc_verified',
            'total_strength',
            'applied_count',
            'accepted_count',
        ]
    
    def get_applied_count(self, obj):
        return obj.applied_participant.count()
    
    def get_accepted_count(self, obj):
        return obj.accepted_participant.count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        owner_id = representation.get('owner').get('college_id')
        organizers = representation.get('organizer')
        representation['organizer'] = [i for i in organizers if i.get('college_id') != owner_id]
        return representation

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
    pass

class EventDetailSerializerOrganizer(EventDetailSerializerStudent):
    approval_message = serializers.SerializerMethodField()
    status = serializers.CharField(source="get_status_display")
    accepted_participant = user_serializer.OrganizerSerializer(many=True)
    applied_participant = user_serializer.OrganizerSerializer(many=True)
    accepted_role = serializers.SerializerMethodField()
    
    def get_approval_message(self, obj):
        if obj.messages is None:
            return []
        return obj.messages
    
    def get_accepted_role(self, obj):
        rv = []
        for role in obj.accepted_role:
            if role in self.ROLE_CHOICES:
                rv.append(self.ROLE_CHOICES[role])
        return rv
    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
            'owner',
            'club',
            'image',
            'organizer',
            'short_description',
            'long_description',
            'date',
            'time',
            'venue',
            'branch',
            'start_date',
            'end_date',
            'accepted_participant',
            'applied_participant',
            'fcfs',
            'accepted_role',
            'status',
            'hod_verified',
            'dean_verified',
            'vc_verified',
            'approval_message',
            'total_strength',
        ]

class EventCreateSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
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
        ]

    

    def validate_title(self, value):
        value = value.strip()
        value = value.title()
        if value == '':
            raise serializers.ValidationError('Title Cannot be Blank')
        return value
    

class EventUpdateSerializer(EventCreateSerializer):
    pass        



class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['abbreviation', 'name']