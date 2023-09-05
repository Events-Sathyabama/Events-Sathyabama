from django.shortcuts import render, get_object_or_404, Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist
import re
from django.shortcuts import render
import os
from .apps import MailConfig

User = get_user_model()


def render_template(request):
    template_list = os.listdir(f'{MailConfig.name}/templates')
    template_list.remove('template_list.html')
    get_data = request.GET.get('template_name', None)
    if get_data is None:
        return render(request, 'template_list.html', {'template_list': template_list})

    response = render(request, get_data, {})
    response['X-Frame-Options'] = 'SAMEORIGIN'
    return response
