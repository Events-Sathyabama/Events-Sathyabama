from django.contrib import admin
from django.urls import path
from . import views


app_name = 'event'

urlpatterns = [
    path('completed/list/', views.CompletedEventList.as_view()),
    path('ongoing/list/', views.OngoingEventList.as_view()),
    path('upcoming/list/', views.UpcomingEventList.as_view()),
    path('detail/<int:pk>', views.EventDetail.as_view()),
    ]
