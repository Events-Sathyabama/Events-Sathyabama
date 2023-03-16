from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event, Club
from user.models import Branch
from django.utils import timezone
from user.serializers import BranchSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .mixins import SearchQueryMixins
from django.db.models import Q

class CompletedEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(end_date__lt=timezone.now()).order_by('-end_date')

class OngoingEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers

    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__lte=timezone.now(), end_date__gte=timezone.now())
    
class UpcomingEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializers
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__gt=timezone.now()).order_by('start_date')
   

class EventDetail(generics.RetrieveAPIView):
    # 2 SQL queries
    queryset = Event.objects.prefetch_related('organizer')
    serializer_class = serializers.EventDetailSerializers

    

class EventCreate(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCreateSerializers

    def post(self, request, *args, **kwargs):
        some = request
        print(request.data)
        return super().post(request, *args, **kwargs)

    def perform_create(self, obj):
        organizer = obj.validated_data.get('organizer')
        
        if organizer is None:
            organizer = [self.request.user.pk]

        if self.request.user.pk not in organizer:
            organizer.append(self.request.user)
        obj.save(organizer=organizer, owner=self.request.user.pk)


class EventUpdate(generics.UpdateAPIView):
    queryset = Event.objects.filter(~Q(status=4))
    serializer_class = serializers.EventCreateSerializers

@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializers(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch':branch.data})
