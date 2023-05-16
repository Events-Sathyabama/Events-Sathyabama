from django.contrib import admin
from django.urls import path
from . import views


app_name = 'mail'


urlpatterns = [
    path('forgot_password/', views.forgot_password, name='forgot_password'),

]
