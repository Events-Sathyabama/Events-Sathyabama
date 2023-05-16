from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

app_name = 'user'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('detail/<int:pk>/', views.UserListView.as_view()),
    path('organizer/', views.GetOrganizer.as_view()),
    path('verify_otp/', views.verify_otp),
    path('reset_password/', views.reset_password),

]