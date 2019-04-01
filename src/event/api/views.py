from rest_framework.generics import ( 
	ListAPIView,
	RetrieveAPIView,
	CreateAPIView,

	)
from rest_framework.views import APIView
from rest_framework.permissions import (
	AllowAny, 
	IsAuthenticated,
	)


from .permissions import IsOwnerOrReadOnly

from .serializers import ( 
	EventDetailSL,  
	ParticipantSL,
	ParticipantDeleteSL
	)

from event.models import (
	Event,
	Participant
	)


class EventDetailAPIView(RetrieveAPIView):
	queryset = Event.objects.all()
	permission_classes = [AllowAny]
	serializer_class = EventDetailSL
	lookup_field = 'slug'



class ParticipantCreateAPIView(CreateAPIView):
	serializer_class = ParticipantSL
	permission_classes = [IsAuthenticated]

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class ParticipantListAPIView(ListAPIView):
	permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
	serializer_class = ParticipantSL

	def get_queryset(self, *args, **kwargs):
		queryset = Participant.objects.filter(user=self.request.user)
		return queryset

class ParticipantDeleteAPIView(APIView):
	permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

	def get(self, request, pk, format=None):
		EventToDelete = Participant.objects.filter(id=pk)
		EventToDelete.delete()
		return EventToDelete