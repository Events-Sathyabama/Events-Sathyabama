from django.urls import path
from . import views


app_name = 'adminpanel'


urlpatterns = [

    path('report/', views.event_last_twelve_month),
    path('sync_user/', views.sync_user),
    path('upload_excel/', views.upload_excel),


]
