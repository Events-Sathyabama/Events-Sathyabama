from django.shortcuts import render
from rest_framework import generics
from . import serializers
from .models import Event, Club, EventParticipant
from user.models import Branch
from django.http import Http404
from django.utils import timezone
from user.serializers import BranchSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .mixins import SearchQueryMixins
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
import user.serializers as user_serializer
from django.contrib.auth import get_user_model

User = get_user_model()
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

    serializers = {
        'student': serializers.EventDetailSerializerStudent,
        'organizer': serializers.EventDetailSerializerOrganizer,
        'HOD_DEAN_VC': serializers.EventDetailSerializerHodDeanVC,
    }
    # TODO return null of the event is not in displayed state for role 0
    # 3 SQL queries
    def get_object(self):
        event_id = self.kwargs.get('pk')
        try:
            event = Event.objects.prefetch_related('eventparticipant_set__user').get(pk=event_id)
            return event
        except:
            raise Http404("No Event Found!!!")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_serializer_class(self):
        event = self.get_object()
        if event.is_organizer(self.request.user) or event.is_owner(self.request.user):
            return self.serializers['organizer']
        elif self.request.user.role in {2,3,4}:
            return self.serializers['HOD_DEAN_VC']
        else:
            return self.serializers['student']

    # serializer_class = serializers.EventDetailSerializer


class EventCreate(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventCreateSerializer
    # TODO Not allowed if the user role is 0
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
        ser = super().get_serializer(*args, **kwargs)
        return ser

    def perform_create(self, serializer):
        event = serializer.save()
        
        event.set_owner(self.request.user)


class EventUpdate(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = serializers.EventUpdateSerializer
    lookup_field = 'pk'
    # TODO not allowd if the user is not Organizer
    def patch(self, request, *args, **kwargs):
        # Modify request.data before validation
        data = {}
        data['branch'] = []
        data['organizer'] = []
        for i in request.data:
            if i.endswith('[]'):
                data[i[:-2]] = request.data.getlist(i)
            else:
                data[i] = request.data.get(i)
        request._data = data
        return super().patch(request, *args, **kwargs)

    def update(self, *args, **kwargs):
        x = super().update(*args, **kwargs)
        return x


class RegisteredEvent(generics.ListAPIView):
    serializer_class = serializers.EventRegisterdCompletedPending

    def get_queryset(self):
        q = (Q(participants__id=self.request.user.pk) 
            & Q(eventparticipant__owner=False) 
            & Q(eventparticipant__organizer=False) 
            & Q(status__in=[4, 9])
            & Q(eventparticipant__status__in=['3', '2', '1'])
        )
        event = Event.objects.filter(q)
        return event
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CompletedEvent(generics.ListAPIView):
    serializer_class = serializers.EventRegisterdCompletedPending

    def get_queryset(self):

        q = (Q(participants__id=self.request.user.pk) 
                & Q(status__in=[5, 6, 7, 8])
                & (
                    (Q(eventparticipant__status='3') & Q(eventparticipant__owner=False) & Q(eventparticipant__organizer=False))
                    | (Q(eventparticipant__owner=True) | Q(eventparticipant__organizer=True))
                )
        )
        event = Event.objects.filter(q)
        return event
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class OrganizingEvent(generics.ListAPIView):
    serializer_class = serializers.EventOrganizer

    def get_queryset(self):
        q = (Q(participants__id=self.request.user.pk) 
                & (Q(eventparticipant__owner=True) | Q(eventparticipant__organizer=True))
                & Q(status__in=[2,4])
                # & Q(hod_verified=True)
                # & Q(dean_verified=True)
                # & Q(vc_verified=True)

        )
        event = Event.objects.filter(q)
        return event
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# pending for approval
class PendingEvent(generics.ListAPIView):
    serializer_class = serializers.EventRegisterdCompletedPending
    # TODO not allowed for role 0
    def get_queryset(self):
        if self.request.user.role == 2: # HOD
            q = Q(status=1) & Q(hod_verified=False)
        elif self.request.user.role == 3: #Dean
            q = Q(status=1) & Q(dean_verified=False) & Q(hod_verified=True)
        elif self.request.user.role == 4: # VC
            q = Q(status=1) & Q(vc_verified=False) & Q(dean_verified=True)
        else:
            q = (Q(participants__id=self.request.user.pk) 
                    & (Q(eventparticipant__owner=True) | Q(eventparticipant__organizer=True))
                    & Q(status__in=[1,3])

            )
        if self.request.user.branch:
            q = q & (Q(branch__in=[self.request.user.branch]) | Q(branch__isnull=True))
        q = q & Q(start_date__gte=timezone.now())
        event = Event.objects.filter(q)
        return event
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class EventTimeLine(generics.RetrieveAPIView):
    serializer_class = serializers.EventTimeLine
    queryset = Event.objects.all()


@api_view(['POST'])
def approve_event(request, event_id):
    user_role = request.user.role
    user = request.user
    if user_role < 2:
        return Response(data={'detail': 'Operation Not Allowed'}, status=403)
    event = Event.objects.filter(pk=event_id)
    if not event.exists():
        return Response(data={'detail': 'No Event Found'}, status=404)
    event = event.first()
    try:
        if user_role == 2: # hod
            if event.hod_verified is False:
                event.hod_verified = True
                if not event.create_timeline(level=1, user=user, msg='Verified by HOD', status=1):
                    raise Exception
                event.save()

        elif user_role == 3: # Dean
            if event.dean_verified is False:
                if event.hod_verified is True:
                    event.dean_verified = True
                    if not event.create_timeline(level=2, user=user, msg='Verified by Dean', status=1):
                        raise Exception
                    event.save()
                else:
                    return Response(data={'detail': 'This event need to be verified by HOD first'})

        elif user_role == 4: # VC
            if event.vc_verified is False:
                if event.hod_verified is False:
                    return Response(data={'detail': 'This event need to be verified by HOD first'})
                if event.dean_verified is False:
                    return Response(data={'detail': 'This event need to be verified by Dean first'})
                event.vc_verified = True
                event.status = 4
                if not event.create_timeline(level=3, user=user, msg='Verified by Vice-Chancellor', status=1):
                    raise Exception
                if not event.create_timeline(level=4, user=user, msg='Displayed', status=1):
                    raise Exception
                event.save()
    except:
        return Response(data={'detail': 'Something went Wrong'}, status=500)

    return Response(data={'detail': 'Approved Successfully'})

@api_view(['POST'])
def deny_event(request, event_id):
    user_role = request.user.role
    user = request.user
    msg = request.POST.get('message')
    if user_role < 2:
        return Response(data={'detail': 'Operation Not Allowed'}, status=403)
    event = Event.objects.filter(pk=event_id)
    if not event.exists():
        return Response(data={'detail': 'No Event Found'}, status=404)
    event = event.first()

    if user_role == 2: # hod
        if event.hod_verified is False:
            event.hod_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=1, user=user, msg='Declined By HOD', status=0):
                raise Exception
            event.save()
        return Response(data={'detail': 'Approved Successfully'})

    if user_role == 3: # Dean
        if event.dean_verified is False:
            event.dean_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=2, user=user, msg='Declined by Dean', status=0):
                raise Exception
            event.save()
        return Response(data={'detail': 'Approved Successfully'})
        
    if user_role == 4: # VC
        if event.vc_verified is False:
            event.vc_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=3, user=user, msg='Declined by VC', status=0):
                raise Exception
            event.save()
        return Response(data={'detail': 'Approved Successfully'})

    return Response(data={'detail': 'Something went Wrong'}, status=500)


@api_view(['POST'])
def upload_report(request, event_id):
    event = Event.objects.get(id=event_id)
    report_file = request.FILES.get('file')
    if report_file:
        event.report = report_file
        event.status = 6
        event.save()
        return Response(data={'detail': 'Report Uploaded!!'})
    else:
        return Response(data={'detail': 'Please send a valid File!!'})

@api_view(['POST'])
def upload_certs(request, event_id):
    # Retrieve all EventParticipant objects for the specified event
    event_participants = EventParticipant.objects.filter(event_id=event_id)
    if handle_upload(request.FILES.get('cert')) is False:
        return Response(data={'detail': 'Upload Failed'}, status=400)
    participants_to_update = []
    for participant in event_participants:
        user_id = participant.user_id  # Get the user ID for each participant
        certificate_filename = os.path.join('certs', str(event_id), f"{user_id}.jpg") # Generate the certificate filename based on user ID
        
        participant.certificate = certificate_filename  # Update the certificate field
        participants_to_update.append(participant)

    EventParticipant.objects.bulk_update(participants_to_update, ['certificate'])
    return Response(data={'detail': 'Uploaded Successfully'}, status=200)

@api_view(['GET'])
def apply_event(request, pk):
    response = Response({'message': 'Event application successfull!!'})
    try:
        event = Event.objects.get(pk=pk)
        status, message = event.register_participant(user=request.user)
        if status is True:
            response.data['message'] = message
            response.status_code = 200
        else:
            response.status_code = 403
            response.data['message'] = message
    except:
        response = Response(status=404, data={'message': 'No Event Found!!'})
    return response


@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializer(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch': branch.data})
