from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Branch

User = get_user_model()
choice_dict = dict(User.ROLE_CHOICE)


class UserProfile(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    branch = serializers.CharField()

    class Meta:
        model = User
        fields = ['college_id', 'role', 'full_name', 'branch']


class BranchSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = Branch
        fields = ['name']

    def get_name(self, obj):
        return f"{obj.name} ({obj.batch})"