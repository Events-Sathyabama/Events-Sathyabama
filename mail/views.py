from django.shortcuts import render, get_object_or_404, Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist
import re



User = get_user_model()


def forgot_password(user):
    try:
        # user.send_otp()
        username, domain = user.email.split('@')
        modified_username = username[:3] + re.sub(r'\w', '*', username[3:-2]) + username[-2:] + '@' + domain
        return Response(data={'email': modified_username})
    except:
        return Response(data={'detail': 'Something went Wrong'}, status=500)

