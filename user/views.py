from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from django.db.models import Q
from . import serializers
from django.utils import timezone
# Create your views here.
from rest_framework import permissions
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
import re

User = get_user_model()

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


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def send_otp(request):
    college_id = request.data.get('college_id')
    try:
        user = get_object_or_404(User, college_id=college_id)
        username, domain = user.email.split('@')
        modified_username = username[:3] + re.sub(r'\w', '*', username[3:-2]) + username[-2:] + '@' + domain
        if user.send_otp():
            return Response({'detail': 'OTP Sent', 'email': modified_username, 'status':200})
    except:
        return Response({'detail': "Something Went Wrong", 'status':200}, status=500)
    return Response({'detail': "Couldn't send OTP try again later", 'status': 200},  status=400)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def verify_otp(request):
    college_id = request.data.get('college_id')
    opt = request.data.get('otp')
    try:
        user = get_object_or_404(User, college_id=college_id)
        if user.verify_otp(otp):
            return Response({'detail': 'OTP Verified', 'status':200})
    except:
        return Response({'detail': "Something Went Wrong", 'status':200}, status=500)
    return Response({'detail': 'Invalid OTP', 'status': 200},  status=400)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])  
def reset_password(request):
    try:
        otp = request.data.get('otp')
        college_id = request.data.get('college_id')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')
        if password1 == password2:
            user = get_object_or_404(User, college_id=college_id)
            if user.verify_otp(otp):
                user.new_password(password1)
                return  Response({'detail': 'Password reset successfully', 'status':200}, status=200)
        return Response({'detail':'Passwords do not match', 'status': 200}, status=400)
    except:
        return Response({'detail':'Something went wrong', 'status': 200}, status=500)