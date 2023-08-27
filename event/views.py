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
from django.db import transaction
from .messages import Message
import zipfile
from io import BytesIO
import os
from PIL import Image

message = Message()

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
            raise Http404(message.detail.not_found)

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


class ParticipantList(generics.ListAPIView):
    serializer_class = serializers.EventParticipantList
    lookup_field='event_id'
    pagination_class = None

    def get_queryset(self):
        return EventParticipant.objects.filter(event_id=self.kwargs['event_id'], owner=False, organizer=False)




@api_view(['POST'])
def application_approval(request, pk):
    
    data_dict = {data.get('pk'): '3' if data.get('status') == 1 else '1' for data in request.data}
    participants_to_update = []

    # Fetch the existing participants from the database
    existing_participants = EventParticipant.objects.filter(user_id__in=data_dict.keys(), event=pk, owner=False, organizer=False)
    participant_dict = {participant.user_id: participant for participant in existing_participants}

    # Update the statuses and store them in the list
    for user_id, status in data_dict.items():
        participant = participant_dict.get(user_id)
        if participant:
            participant.status = status
            participants_to_update.append(participant)

    # Perform bulk update using bulk_update() method
    with transaction.atomic():
        EventParticipant.objects.bulk_update(
            participants_to_update,
            fields=['status']
        )
    return Response({'detail': message.applicaition_approval.success, 'status':200})


@api_view(['POST'])
def approve_event(request, event_id):
    msg = message.event_approval
    user_role = request.user.role
    user = request.user
    if user_role < 2:
        return Response(data={'detail': msg.forbidden}, status=403)
    event = Event.objects.filter(pk=event_id)
    if not event.exists():
        return Response(data={'detail': msg.forbidden}, status=404)
    event = event.first()
    try:
        if user_role == 2: # hod
            if event.hod_verified is False:
                event.hod_verified = True
                if not event.create_timeline(level=1, user=user, msg=msg.hod_verified, status=1):
                    raise Exception
                event.save()

        elif user_role == 3: # Dean
            if event.dean_verified is False:
                if event.hod_verified is True:
                    event.dean_verified = True
                    if not event.create_timeline(level=2, user=user, msg=msg.dean_verified, status=1):
                        raise Exception
                    event.save()
                else:
                    return Response(data={'detail': msg.verify_hod_first})

        elif user_role == 4: # VC
            if event.vc_verified is False:
                if event.hod_verified is False:
                    return Response(data={'detail': msg.verify_hod_first})
                if event.dean_verified is False:
                    return Response(data={'detail': msg.verify_hod_first})
                event.vc_verified = True
                event.status = 4
                if not event.create_timeline(level=3, user=user, msg=msg.vc_verified, status=1):
                    raise Exception
                if not event.create_timeline(level=4, user=user, msg=msg.approval_process_done, status=1):
                    raise Exception
                event.save()
    except:
        return Response(data={'detail': msg.server_error}, status=500)

    return Response(data={'detail': msg.success})

@api_view(['POST'])
def deny_event(request, event_id):
    msg = message.event_deny
    user_role = request.user.role
    user = request.user
    msg = request.POST.get('message')
    if user_role < 2:
        return Response(data={'detail': msg.forbidden}, status=403)
    event = Event.objects.filter(pk=event_id)
    if not event.exists():
        return Response(data={'detail': msg.not_found}, status=404)
    event = event.first()

    if user_role == 2: # hod
        if event.hod_verified is False:
            event.hod_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=1, user=user, msg=msg.hod_declined, status=0):
                raise Exception
            event.save()
        return Response(data={'detail': msg.success})

    if user_role == 3: # Dean
        if event.dean_verified is False:
            event.dean_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=2, user=user, msg=msg.dean_declined, status=0):
                raise Exception
            event.save()
        return Response(data={'detail': msg.success})
        
    if user_role == 4: # VC
        if event.vc_verified is False:
            event.vc_verified = False
            event.rejected = True
            event.status = 3
            if not event.create_timeline(level=3, user=user, msg=msg.vc_declined, status=0):
                raise Exception
            event.save()
        return Response(data={'detail': msg.sucecss})

    return Response(data={'detail': msg.server_error}, status=500)


@api_view(['POST'])
def upload_report(request, event_id):
    msg = message.report_upload
    event = Event.objects.get(id=event_id)
    report_file = request.FILES.get('file')
    if report_file:
        event.report = report_file
        event.status = 6
        event.save()
        return Response(data={'detail': msg.success, 'link': request.build_absolute_uri(event.report.url)})
    else:
        return Response(data={'detail': msg.error})

@api_view(['POST'])
def upload_certs(request, event_id):
    msg = message.cert_upload

    # Retrieve all EventParticipant objects for the specified event
    event_participants = EventParticipant.objects.filter(event_id=event_id)

    # Check if a zip file is provided in the request
    if 'file' not in request.FILES:
        return Response(data={'detail': msg.file_not_found}, status=400)

    zip_file = request.FILES['file']
    if not zipfile.is_zipfile(zip_file):
        return Response(data={'detail': msg.invalid_file_type}, status=400)

    student_certificate = {}
    invalid_files = []
    zip_ref = zipfile.ZipFile(zip_file, 'r')
    certificate_names = zip_ref.namelist()
    
    for cert in certificate_names:
        fileName, file_type = os.path.splitext(cert)
        if fileName.isnumeric():
            student_certificate[fileName] = [cert, zip_ref.read(cert)]
        else:
            invalid_files.append(fileName)
    
        

    participants_to_update = []
    for participant in event_participants:
        college_id = participant.user.college_id  # Get the user ID for each participant
        
        # Check if the image exists in the zip file
        if participant.status == '3' and college_id in student_certificate:
            # Update the certificate field and add to the update list
            file_name = student_certificate[college_id][0]
            image_data = student_certificate[college_id][1]

            # Convert binary data to an in-memory image

            participant.certificate.save(file_name, BytesIO(image_data))
            participants_to_update.append(participant)

    if len(participants_to_update) > 0:
        with transaction.atomic():
            EventParticipant.objects.bulk_update(participants_to_update, ['certificate'])
        return Response(data={'detail': msg.success, 'certified_quantity': len(participants_to_update), 'invalid_files': invalid_files}, status=200)
    else:
        return Response(data={'detail': 'No certificates to update', 'invalid_files': invalid_files}, status=400)

@api_view(['GET'])
def delete_certs(request, pk):
    msg = message.delete_cert
    event_participants = EventParticipant.objects.filter(event_id=pk, status='3')
    participants_to_update = []
    for participant in event_participants:
        participant.certificate = None  
        participants_to_update.append(participant)
    if len(participants_to_update) > 0:
        with transaction.atomic():
            EventParticipant.objects.bulk_update(participants_to_update, ['certificate'])


    return Response({'detail': msg.success}, status=200)

@api_view(['GET'])
def apply_event(request, pk):
    msg = message.apply_event
    response = Response({'detail': msg.success})
    try:
        event = Event.objects.get(pk=pk)
        status, message = event.register_participant(user=request.user)
        if status is True:
            response.data['detail'] = message
            response.status_code = 200
        else:
            response.status_code = 403
            response.data['detail'] = message
    except:
        response = Response(status=404, data={'detail': msg.not_found})
    return response


@api_view(['GET'])
def club_branch(request):
    club = serializers.ClubSerializer(Club.objects.all(), many=True)
    branch = BranchSerializer(Branch.objects.all(), many=True)
    return Response({'club': club.data, 'branch': branch.data})


@api_view(['GET'])
def delete_event(reuqest, pk):
    msg = message.delete_event
    event = get_object_or_404(Event, pk=pk)
    title = event.title
    event.delete()
    return Response({'detail': msg.success, 'status':200})

@api_view(['GET'])
def delete_report(request, pk):
    msg = message.delete_report
    event = get_object_or_404(Event, pk=pk)
    file_name = event.report
    event.report = None
    event.save()
    return Response({'detail': msg.success, 'status':200})

