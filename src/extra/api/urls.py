from django.urls import path,re_path

from .views import (
	ContactUsCreateAPIView
	)

app_name = 'extra-api'

urlpatterns = [
    path('contactus/create/', ContactUsCreateAPIView.as_view(), name='contact-create'),
]
