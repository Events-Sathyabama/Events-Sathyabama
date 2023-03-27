from django.contrib import admin
from django.urls import path
from . import views
import time


app_name = 'event'


urlpatterns = [
    path('completed/list/', views.CompletedEventList.as_view()),
    path('ongoing/list/', views.OngoingEventList.as_view()),
    path('upcoming/list/', views.UpcomingEventList.as_view()),
    path('detail/<int:pk>/', views.EventDetail.as_view()),
    path('create/', views.EventCreate.as_view()),
    path('update/<int:pk>/', views.EventUpdate.as_view()),
    path('club/branch/', views.club_branch),
]
