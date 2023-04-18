from django.contrib import admin
from django.contrib.auth import get_user_model
# Register your models here.
from .models import Event, Club, EventParticipant
from django import forms
from django.core.exceptions import ValidationError


User = get_user_model()




class EventForm(forms.ModelForm):
    accepted_role = forms.MultipleChoiceField(choices=User.ROLE_CHOICE, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Event
        fields = '__all__'


    def clean_accepted_role(self):
        role = self.cleaned_data.get('accepted_role')
        for i in range(len(role)):
            role[i] = int(role[i])

        return role

class EventParticipantFormset(forms.models.BaseInlineFormSet):
    model = EventParticipant

    def clean(self, *args, **kwargs):
        super().clean(*args, **kwargs)
        try:
            data = self.cleaned_data
            owner_count = 0
            for participant in data:
                if participant.get('owner') is True:
                    owner_count += 1
                if participant.get('owner') is True or participant.get('organizer') is True:
                    participant['status'] = '0'
            if owner_count > 1:
                raise ValidationError('Only One Owner is Allowed')
        except:
            pass
                
   

    
class EventParticipantInline(admin.TabularInline):
    model = EventParticipant
    extra = 1
    formset = EventParticipantFormset
    

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    inlines = [EventParticipantInline]
    form = EventForm

    def get_inline_instances(self, request, *args, **kwargs):
        formset = super(EventAdmin, self).get_inline_instances(request, *args, **kwargs)
        return formset
    

    def get_form(self, request, *args, **kwargs):
        form = super(EventAdmin, self).get_form(request, *args, **kwargs)
        return form
    

admin.site.register(Club)