from rest_framework import permissions
from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Event, EventParticipant


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 0


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 1


class IsHOD(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 2


class IsDean(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 3


class IsVC(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 4


class IsOrganizer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.organizer.filter(user=request.user).exists()


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


def is_authenticated(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            return Response(data={'detail': 'You must be authenticated to perform this action.'}, status=401)
    return _wrapped_view


def required_roles(role_values=[]):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user
            if user.is_authenticated and user.role in role_value:
                return view_func(request, *args, **kwargs)
            else:
                return Response(data={'detail': 'You do not have permission to perform this action.'}, status=403)
        return _wrapped_view
    return decorator


def is_event_organizer(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        event_id = kwargs['event_id']
        q = Q(event_id=event_id) & Q(user=request.user) & (
            Q(owner=True) | Q(organizer=True))
        if EventParticipant.objects.filter(q).exists():
            return view_func(request, *args, **kwargs)
        else:
            return Response(data={'detail': 'You do not have permission to perform this action.'}, status=403)
    return _wrapped_view


def is_event_owner(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        event_id = kwargs['event_id']
        q = Q(event_id=event_id) & Q(user=request.user) & Q(owner=True)
        if EventParticipant.objects.filter(q).exists():
            return view_func(request, *args, **kwargs)
        else:
            return Response(data={'detail': 'You do not have permission to perform this action.'}, status=403)
    return _wrapped_view
