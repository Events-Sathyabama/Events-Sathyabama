from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from django.db.models import Q

from event.mixins import PermissionDenyStudentMixin
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
import http.client
import json
import re
from django.conf import settings

User = get_user_model()


class UserListView(generics.RetrieveAPIView):
    serializer_class = serializers.UserProfile

    def get_object(self):
        # Get the currently authenticated user
        return self.request.user


class GetOrganizer(generics.ListAPIView, PermissionDenyStudentMixin):
    serializer_class = serializers.UserDetail

    def get_active_user_query(self):
        return (Q(is_active=True) &
                Q(role__in=[0, 1, 2, 3, 4]) &
                ~Q(pk=self.request.user.pk))

    def get_queryset(self, *args, **kwargs):
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
        modified_username = username[:3] + re.sub(
            r'\w', '*', username[3:-2]) + username[-2:] + '@' + domain
        if user.send_otp():
            return Response({'detail': 'OTP Sent', 'email': modified_username, 'status': 200})
    except:
        return Response({'detail': "User Does not Exist!", 'status': 404}, status=404)
    return Response({'detail': "Couldn't send OTP try again later", 'status': 200}, status=400)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def verify_otp(request):
    college_id = request.data.get('college_id')
    otp = request.data.get('otp')
    try:
        user = get_object_or_404(User, college_id=college_id)
        if user.verify_otp(otp):
            return Response({'detail': 'OTP Verified', 'status': 200})
    except:
        return Response({'detail': "Something Went Wrong", 'status': 200}, status=500)
    return Response({'detail': 'Invalid OTP', 'status': 200}, status=400)


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
                return Response({'detail': 'Password reset successfully', 'status': 200}, status=200)
        return Response({'detail': 'Passwords do not match', 'status': 200}, status=400)
    except:
        return Response({'detail': 'Something went wrong', 'status': 200}, status=500)


@api_view(['POST'])
def bug_report(request):
    conn = http.client.HTTPSConnection("api.github.com")

    def get_card(key, value):
        value = str(value).replace('-', '_')
        return f'<img src="https://img.shields.io/badge/{key}-{value}-blue"/>\n'

    personal_info = {
        'Name': request.user.full_name,
        'College_Id': request.user.college_id,
        'Branch': request.user.branch or '',
    }
    user = request.user
    info_str = '\n\n' + \
               f'## Issue (or) enhancement suggestion created on behalf of: \n{user.full_name} \n{user.college_id} \n{user.branch or ""} \n{user.batch}'

    # for key in personal_info:
    #     info_str += get_card(key, personal_info[key])
    try:

        payload = json.dumps({
            "title": request.data.get('title'),
            "body": request.data.get('body') + info_str + '\n',
            "labels": request.data.get('labels')
        })
        headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Aryan-Django-Backend',
            'Authorization': f'Bearer {settings.GIT_BUG_REPORT_API_KEY}'
        }
        conn.request(
            "POST", "/repos/Events-Sathyabama/Events-Sathyabama/issues", payload, headers)
        res = conn.getresponse()
        if res.code > 299:
            return Response(data={'detail': 'Something Went Wrong try again after sometime!!'}, status=res.code)
        data = res.read()
        data = json.loads(data)
    except:
        return Response(data={'detail': 'Something Went Wrong'}, status=400)
    return Response(data={'detail': 'Bug reported', 'data': data}, status=200)
