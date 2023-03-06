from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email']
