from django.shortcuts import render, get_object_or_404, Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist
import re



User = get_user_model()


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def forgot_password(request):
    college_id = request.data.get('college_id')
    
    try:
        user = User.objects.get(college_id=college_id)
        # user.send_otp()
        username, domain = user.email.split('@')
        modified_username = username[:3] + re.sub(r'\w', '*', username[3:-2]) + username[-2:] + '@' + domain
        return Response(data={'email': modified_username})
    except ObjectDoesNotExist:
        return Response(data={'detail': 'Invalid User Id'}, status=404)
    except:
        return Response(data={'detail': 'Something went Wrong'}, status=500)

