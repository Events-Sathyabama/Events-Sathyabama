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




class EventDetailSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    long_description = serializers.SerializerMethodField()
    organizer = user_serializer.OrganizerSerializer(many=True)
    branch = user_serializer.BranchSerializer(many=True)
    owner = user_serializer.OrganizerSerializer()
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
            'participant',
        ]
    
    def get_long_description(self, obj):
        if obj.long_description == '':
            return obj.short_description
        return obj.long_description

    def get_date(self, obj):
        format = "%d %b '%y"
        if obj.start_date is None or obj.end_date is None:
            return ''
        return f"{obj.start_date.strftime(format)} - {obj.start_date.strftime(format)}"

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
    

class EventUpdateSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
    organizer = serializers.ListField(child=serializers.IntegerField())
    branch = serializers.ListField(child=serializers.IntegerField())
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
        



class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['abbreviation', 'name']