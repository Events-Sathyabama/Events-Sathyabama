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


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['name', 'batch', 'pk']

    
    
class OrganizerSerializer(serializers.Serializer):
    name = serializers.CharField(source='full_name')
    role = serializers.CharField(source='get_role_display')
    college_id = serializers.CharField()
    pk = serializers.ReadOnlyField()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['role'] != 'Student':
            data['role'] = 'Faculty'
        return data

class OwnerSerializer(serializers.Serializer):
    name = serializers.CharField(source='full_name')
    college_id = serializers.CharField()