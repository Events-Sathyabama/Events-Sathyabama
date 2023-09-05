from django.contrib import admin
from django.urls import path
from . import views


app_name = 'mail'


urlpatterns = [
    path('mail_template/', views.render_template, name='forgot_password'),

]
