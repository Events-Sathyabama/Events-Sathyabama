from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class TokenObtain(TokenObtainPairSerializer):
    default_error_messages = {
        "no_active_account": "Please Provide a valid Login Credentials"
    }
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role_name'] = self.user.get_role_display()
        data['role_code'] = self.user.role
        data['name'] = self.user.full_name
        data['id'] = self.user.college_id
        return data