from django.shortcuts import render
from event.models import Event
from django.utils import timezone
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


# Create your views here.
@api_view(['GET'])
def event_last_twelve_month(request):
    twelve_months_ago = timezone.now() - timezone.timedelta(days=365)
    events = Event.objects.filter(start_date__gte=twelve_months_ago)

    event_count = {timezone.datetime.strptime(
        str(i), '%m').strftime('%b'): 0 for i in range(1, 13)}
    total_count = 0
    pending_count = 0
    rejected_count = 0
    time_interval = twelve_months_ago.strftime(
        "%b'%y") + ' - ' + timezone.now().strftime("%b'%y")
    for event in events:
        month = event.start_date.strftime("%b")
        event_count[month] += 1

        if event.status == 1:
            pending_count += 1
        if event.rejected is True:
            rejected_count += 1
        total_count += 1

    admin_link = request.build_absolute_uri(reverse('admin:index'))

    return Response(data={
        'chart_data': event_count,
        'total_event': total_count,
        'pending_count': pending_count,
        'rejected_count': rejected_count,
        'time_interval': time_interval
    }, status=200)
