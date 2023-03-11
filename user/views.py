from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from . import serializers
# Create your views here.
from rest_framework import permissions


class UserListView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserProfile
    lookup_field = 'pk'
