from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserProfile(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['college_id', 'role', 'full_name', 'branch']
