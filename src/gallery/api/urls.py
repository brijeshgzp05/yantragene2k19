from django.urls import path

from .views import GalleryListAPIView

app_name = 'gallery-api'

urlpatterns = [
    path('', GalleryListAPIView.as_view(), name='images'),

]
