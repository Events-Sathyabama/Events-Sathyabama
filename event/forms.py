from django import forms
from .models import Event

class EventCreationForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            'organizer',
            'participant',
            'image',
            'title',
            'short_description',
            'long_description',
            'club',
            'venue',
            'start_date',
            'end_date',
            'date',
            'time',
            'branch',
        ]
    
    def clean_title(self):
        print(self.cleaned_data.get('title'))
    
    
