from django.contrib import admin
from django.urls import path
from . import views
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

app_name = 'event'

@csrf_exempt
def fun(request, *args, **kwargs):
    from django.http.multipartparser import MultiPartParser

    query_dict, multi_value_dict = MultiPartParser(request.META, request, 
                                                  request.upload_handlers).parse()
    print(query_dict)
    res = HttpResponse()
    res.status_code = 404
    return res
    # views.EventCreate.as_view(request, *args, **kwargs)
urlpatterns = [
    path('completed/list/', views.CompletedEventList.as_view()),
    path('ongoing/list/', views.OngoingEventList.as_view()),
    path('upcoming/list/', views.UpcomingEventList.as_view()),
    path('detail/<int:pk>/', views.EventDetail.as_view()),
    path('create/', views.EventCreate.as_view()),
    path('update/<int:pk>/', views.EventUpdate.as_view()),
    path('club/branch/', views.club_branch),
]
