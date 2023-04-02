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
from django.shortcuts import get_object_or_404


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
        event_obj = Event.objects.select_related('owner').prefetch_related(
            'organizer', 'accepted_participant').get(id=event_id)
        return event_obj

    def get_serializer_class(self):
        event = self.get_object()
        if event.is_organizer(self.request.user):
            return serializers.EventDetailSerializerOrganizer
        else:
            return serializers.EventDetailSerializerStudent
            
    # serializer_class = serializers.EventDetailSerializer


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
        kwargs['data'] = data
        return super().get_serializer(*args, **kwargs)

    def perform_create(self, serializer):
        event = serializer.save(owner=self.request.user)


class EventUpdate(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventUpdateSerializer

    def get_serializer(self, *args, **kwargs):
        data = {}
        data['branch'] = []
        data['organizer'] = []
        for i in self.request.data:
            if i.endswith('[]'):
                data[i[:-2]] = self.request.data.getlist(i)
            else:
                data[i] = self.request.data.get(i)
        kwargs['data'] = data
        return super().get_serializer(*args, **kwargs)

@api_view(['GET'])    
def apply_event(request, pk):
    response = Response({'message': 'Event Application Successfull!!'})
    try:
        event = Event.objects.get(pk=pk)
        if event.is_eligible_to_apply(user=request.user):
            event.applied_participant.add(request.user)
            response.status_code = 200
        else:
            response.status_code = 403
            response.data['message'] = event.eligible_message
    except:
        response = Response()
        response.status_code = 404
        response.data['message'] = 'No Event Found!!'
    return response

@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializer(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch':branch.data})
