from django.contrib import admin
from django.urls import path
from . import views


app_name = 'event'

urlpatterns = [
    path('list/', views.event_list.as_view()),
    ]
