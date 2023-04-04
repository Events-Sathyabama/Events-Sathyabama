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
    total_strength = serializers.SerializerMethodField()
    
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
            "organizer",
            "branch",
            "owner",
            "applied_count",
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
        ]
        additional_fields = []
        fields += additional_fields
    
    def get_total_strength(self, obj):
        return obj.total_strength or 0

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
    is_applied = serializers.SerializerMethodField()
    is_accepted = serializers.SerializerMethodField()
    
    applied_count = serializers.SerializerMethodField()
    accepted_count = serializers.SerializerMethodField()
    

    def get_applied_count(self, obj):
        return obj.applied_participant.count()

    def get_accepted_count(self, obj):
        return obj.accepted_participant.count()
    
    def get_is_applied(self, obj):
        request = self.context.get('request')
        if obj.applied_participant.filter(pk = request.user.pk).exists():
            return True
        return False
    
    def get_is_accepted(self, obj):
        request = self.context.get('request')

        if obj.accepted_participant.filter(pk = request.user.pk).exists():
            return True
        return False
    
    class Meta:
        fields = [
            'is_applied',
            'is_accepted',
            'applied_count',
            'accepted_count',
        ]
    

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
        fields = [
            'approval_message',
            'status',
            'accepted_participant',
            'applied_participant',
            'accepted_role',
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