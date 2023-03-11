from rest_framework import serializers
from .models import Event


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
        return f"{obj.start_date.strftime(format)} - {obj.start_date.strftime(format)}"


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
            'venue'
        ]

    def get_organizer(self, obj):
        organize = []
        for i in obj.organizer.all():
            organize.append({
                'role': i.get_role_display(),
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
        return f"{obj.start_date.strftime(format)} - {obj.start_date.strftime(format)}"
