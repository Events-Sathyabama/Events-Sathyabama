from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Branch
from event.models import EventParticipant

User = get_user_model()
choice_dict = dict(User.ROLE_CHOICE)


class UserProfile(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    branch = serializers.CharField()

    class Meta:
        model = User
        fields = ['college_id', 'role', 'full_name', 'branch', 'batch']


class UserDetail(serializers.ModelSerializer):
    branch = serializers.SerializerMethodField()
    name = serializers.CharField(source='full_name')
    role = serializers.CharField(source='get_role_display')

    class Meta:
        model = User
        fields = ['batch',
                  'name',
                  'role',
                  'college_id',
                  'pk', 'branch']

    def get_branch(self, obj):
        return obj.branch.name if obj.branch is not None else ''


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['name', 'batch', 'pk']


class OrganizerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.full_name')
    role = serializers.CharField(source='user.get_role_display')
    batch = serializers.CharField(source='user.batch')
    college_id = serializers.CharField(source='user.college_id')
    pk = serializers.CharField(source='user_id')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['role'] != 'Student':
            data['role'] = 'Faculty'
        return data

    class Meta:
        model = EventParticipant
        fields = [
            'batch',
            'name',
            'role',
            'college_id',
            'pk'
        ]


class OwnerSerializer(serializers.Serializer):
    name = serializers.CharField(source='full_name')
    role = serializers.CharField(source='get_role_display')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['role'] != 'Student':
            data['role'] = 'Faculty'
        return data

    class Meta:
        model = User
        fields = [
            'batch',
            'name',
            'role',
            'college_id',
            'pk'
        ]


class ParticipantSerializer(OrganizerSerializer):
    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        request = self.context.get('request')
        if obj.accepted_participant.filter(pk=request.user.pk).exists():
            return 1
        return 0
