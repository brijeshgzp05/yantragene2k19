from rest_framework.generics import (
	ListAPIView, 
	)

from rest_framework.permissions import (
	AllowAny, 
	)

from .serializers import GalleryListSL
from gallery.models import Gallery



class GalleryListAPIView(ListAPIView):
	queryset = Gallery.objects.all()
	permission_classes = [AllowAny]
	serializer_class = GalleryListSL