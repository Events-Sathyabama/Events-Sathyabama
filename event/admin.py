from django.contrib import admin

# Register your models here.
from .models import Event, Club

admin.site.register(Club)
admin.site.register(Event)