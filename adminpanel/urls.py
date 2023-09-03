from django.urls import path
from . import views


app_name = 'event'


urlpatterns = [

    path('report/', views.event_last_twelve_month),


]
