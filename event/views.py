from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event, Club
from user.models import Branch
from django.utils import timezone
from user.serializers import BranchSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .mixins import SearchQuery


class CompletedEventList(SearchQuery, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(end_date__lt=timezone.now())

class OngoingEventList(SearchQuery, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers

    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__gte=timezone.now(), end_date__lte=timezone.now())
    
class UpcomingEventList(SearchQuery, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__gt=timezone.now())
   

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
