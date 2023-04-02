from django.contrib import admin
from django.contrib.auth import get_user_model
# Register your models here.
from .models import Event, Club
from django import forms

User = get_user_model()
class EventForm(forms.ModelForm):
    accepted_role = forms.MultipleChoiceField(choices=User.ROLE_CHOICE, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Event
        fields = '__all__'

    def clean_accepted_role(self):
        print('hi')
        role = self.cleaned_data.get('accepted_role')
        for i in range(len(role)):
            role[i] = int(role[i])

        return role
class EventAdmin(admin.ModelAdmin):
    form = EventForm

admin.site.register(Club)
admin.site.register(Event, EventAdmin)