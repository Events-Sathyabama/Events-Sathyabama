from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event, Club
from user.models import Branch
from django.utils import timezone
from user.serializers import BranchSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .mixins import SearchQueryMixins
from django.db.models import Q
from django.core.exceptions import ValidationError


class CompletedEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializer
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(end_date__lt=timezone.now()).order_by('-end_date')

class OngoingEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializer

    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__lte=timezone.now(), end_date__gte=timezone.now())
    
class UpcomingEventList(SearchQueryMixins, generics.ListAPIView):
    serializer_class = serializers.EventCardSerializer
    
    def get_queryset(self):
        query = super().get_queryset()
        return query.filter(start_date__gt=timezone.now()).order_by('start_date')
   

class EventDetail(generics.RetrieveAPIView):
    # 3 SQL queries
    def get_object(self):
        event_id = self.kwargs.get('pk')
        event_obj = Event.objects.select_related('owner').prefetch_related('organizer', 'participant').get(id=event_id)
        return event_obj

    serializer_class = serializers.EventDetailSerializer

    

class EventCreate(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCreateSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_serializer(self, *args, **kwargs):
        data = {}
        for i in self.request.data:
            if i.endswith('[]'):
                data[i[:-2]] = self.request.data.getlist(i)
            else:
                data[i] = self.request.data.get(i)
        return super().get_serializer(data=data, *args)

    def perform_create(self, serializer):
        event = serializer.save(owner=self.request.user)



class EventUpdate(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventUpdateSerializer


    # def get_object(self, *args, **kwargs):
    #     obj = super(EventUpdate, self).get_object(*args, **kwargs)
    #     # Set serializer initial data to default values from the retrieved object
    #     serializer = self.get_serializer(instance=obj, data={}, partial=True)
    #     serializer.is_valid()
    #     self.initial = serializer.validated_data
    #     return obj

@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializer(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch':branch.data})
