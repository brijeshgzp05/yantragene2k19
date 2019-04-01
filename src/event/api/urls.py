from django.urls import path,re_path

from .views import (
	EventDetailAPIView,  
	ParticipantCreateAPIView,
	ParticipantListAPIView,
	ParticipantDeleteAPIView,
	)

app_name = 'event-api'

urlpatterns = [
    path('participatedin/', ParticipantListAPIView.as_view(), name='participant-list'),
    re_path(r'^(?P<slug>[\w-]+)/$', EventDetailAPIView.as_view(), name="event-detail"),
    re_path(r'^participatedin/delete/(?P<pk>\d+)/$', ParticipantDeleteAPIView.as_view(), name="participant-delete"),
    path('participant/create/', ParticipantCreateAPIView.as_view(), name='participant-create'),
]
