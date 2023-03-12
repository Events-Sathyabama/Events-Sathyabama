from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event, Club
from user.models import Branch
from django.db.models import Q
from django.utils import timezone
from user.serializers import BranchSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view


def create_event_base_query():
    query = Event.objects.all()
    q = Q(start_date__isnull=False)
    q = q | Q(end_date__isnull=False)
    q = q & Q(status=2, hod_verified=1, dean_verified=1, vc_verified=1)
    return query.filter(q)

class CompletedEventList(generics.ListAPIView):
    queryset = create_event_base_query().filter(end_date__lt=timezone.now())
    serializer_class = serializers.EventCardSerializers

class OngoingEventList(generics.ListAPIView):
    queryset = create_event_base_query().filter(start_date__gte=timezone.now(), end_date__lte=timezone.now())
    serializer_class = serializers.EventCardSerializers


class UpcomingEventList(generics.ListAPIView):
    queryset = create_event_base_query().filter(start_date__gt=timezone.now())
    serializer_class = serializers.EventCardSerializers


class EventDetail(generics.RetrieveAPIView):
    # 2 SQL queries
    queryset = Event.objects.prefetch_related('organizer')
    serializer_class = serializers.EventDetailSerializers


class EventCreate(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCreateSerializers

    def perform_create(self, obj):
        organizer = obj.validated_data.get('organizer')
        if self.request.user not in organizer:
            organizer.append(self.request.user)
        obj.save(organizer=organizer)


@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializers(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch':branch.data})
