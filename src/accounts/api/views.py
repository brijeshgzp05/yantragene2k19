from rest_framework.generics import (
	CreateAPIView, 
	ListAPIView,
	)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
	AllowAny,
	IsAuthenticated, 
	)
from event.api.permissions import IsOwnerOrReadOnly

from .serializers import UserCreateSerializer, UserNameGetterSerializer

User = get_user_model()

class UserCreateAPIView(CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [AllowAny]
	serializer_class = UserCreateSerializer



class UserNameGetterAPIView(ListAPIView):
	permission_classes = [IsAuthenticated,IsOwnerOrReadOnly]
	serializer_class = UserNameGetterSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = User.objects.filter(email=self.request.user)
		return queryset
