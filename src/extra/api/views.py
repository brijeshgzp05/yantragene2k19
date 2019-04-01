from rest_framework.generics import ( 
	CreateAPIView,
	)

from rest_framework.permissions import (
	AllowAny, 
	)


from .serializers import ( 
	ContactCreateSL
	)

from extra.models import (
	ContactUs
	)


class ContactUsCreateAPIView(CreateAPIView):
	permission_classes = [AllowAny]
	serializer_class = ContactCreateSL

