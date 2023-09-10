from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from .models import User as U

User = get_user_model()


class UserAdminCreationForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ("college_id", 'role', 'email', 'first_name', 'last_name')
        # field_classes = {"username": UsernameField}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self._meta.model.USERNAME_FIELD in self.fields:
            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs[
                "autofocus"
            ] = True

    def save(self, commit=True):
        user = super().save(commit=False)
        # user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserAdminChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'
        field_classes = {}
