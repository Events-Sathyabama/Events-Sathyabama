from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event
# Create your views here.


class CompletedEventList(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCardSerializers


class OngoingEventList(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCardSerializers


class UpcomingEventList(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCardSerializers


class EventDetail(generics.RetrieveAPIView):
    # 2 SQL queries
    queryset = Event.objects.prefetch_related('organizer')
    serializer_class = serializers.EventDetailSerializers
