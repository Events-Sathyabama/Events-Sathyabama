from rest_framework import serializers
from .models import Event, Club


class EventCardSerializers(serializers.ModelSerializer):
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


class EventDetailSerializers(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    long_description = serializers.SerializerMethodField(source='long_description')
    organizer = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'pk',
            'title',
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
        ]

    def get_organizer(self, obj):
        organize = []
        for i in obj.organizer.all():
            role = i.get_role_display()
            if role == 'Teacher':
                role = 'Faculty'
            organize.append({
                'role': role,
                'name': i.full_name,
            })
        print(obj.organizer)
        return organize

    def get_long_description(self, obj):
        if obj.long_description == '':
            return obj.short_description
        return obj.long_description

    def get_date(self, obj):
        format = "%d %b '%y"
        if obj.start_date is None or obj.end_date is None:
            return ''
        return f"{obj.start_date.strftime(format)} - {obj.start_date.strftime(format)}"


class EventCreateSerializers(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = [
            'pk',
            'organizer',
            'participant',
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
    
    def validate_organizer(self, value):
        print(value)

    def validate_title(self, value):
        value = value.strip()
        value = value.title()
        if value == '':
            raise serializers.ValidationError('Title Cannot be Blank')
        return value
    
# class EventUpdateSerializer(EventCreateSerializer):
#     owner = serializers.


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['abbreviation', 'name']