from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from django.db.models import Q
from . import serializers
from django.utils import timezone
# Create your views here.
from rest_framework import permissions

User = get_user_model()
class UserListView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserProfile
    lookup_field = 'pk'

class GetOrganizer(generics.ListAPIView):
    serializer_class = serializers.OrganizerSerializer

    def get_active_user_query(self):
        return (Q(is_active=True) & 
            Q(role__in=[0,1,2,3]) & 
            ~Q(pk=self.request.user.pk) &
            (Q(leaving_year__isnull=True) | Q(leaving_year__gte=timezone.now().year)))

    def get_queryset(self, *args,  **kwargs):
        search = self.request.GET.get('q')
        search = search.strip() if search is not None else search
        query = User.objects.all()
        q = Q()
        if search is not None:
            search = search.split()
            
            for keyword in search:
                q = q | (Q(first_name__icontains=keyword) | 
                    Q(last_name__icontains=keyword) | 
                    Q(college_id__icontains=keyword) | 
                    Q(email__icontains=keyword))
        return query.filter(q & self.get_active_user_query())
