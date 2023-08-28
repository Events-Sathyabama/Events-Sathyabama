from django.contrib import admin
from django.urls import path
from . import views


app_name = 'event'


urlpatterns = [
    path('completed/list/', views.CompletedEventList.as_view()),
    path('ongoing/list/', views.OngoingEventList.as_view()),
    path('upcoming/list/', views.UpcomingEventList.as_view()),
    path('detail/<int:pk>/', views.EventDetail.as_view()),
    path('create/', views.EventCreate.as_view()),
    path('update/<int:pk>/', views.EventUpdate.as_view()),
    path('apply/<int:event_id>/', views.apply_event),
    path('club/branch/', views.club_branch),
    path('registered/', views.RegisteredEvent.as_view()),
    path('completed/', views.CompletedEvent.as_view()),
    path('organizing/', views.OrganizingEvent.as_view()),
    path('pending/', views.PendingEvent.as_view()),
    path('accept/<int:event_id>/', views.approve_event),
    path('deny/<int:event_id>/', views.deny_event),
    path('timeline/<int:pk>/', views.EventTimeLine.as_view()),
    path('application_approval/<int:event_id>/', views.application_approval),
    path('participant_list/<int:event_id>/', views.ParticipantList.as_view()),
    path('delete/<int:event_id>/', views.delete_event),

    path('report/upload/<int:event_id>/', views.upload_report),
    path('report/<int:event_id>/', views.delete_report),

    path('cert/upload/<int:event_id>/', views.upload_certs),
    path('cert/<int:event_id>/', views.delete_certs),

    path('report/approve/<int:event_id>/', views.approve_report),


]
