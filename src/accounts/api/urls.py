from django.urls import path

from .views import UserCreateAPIView, UserNameGetterAPIView

app_name = 'accounts-api'

urlpatterns = [
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('namegetter/', UserNameGetterAPIView.as_view(), name='namegetter'),

]
