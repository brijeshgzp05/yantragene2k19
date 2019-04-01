from rest_framework import serializers
from gallery.models import Gallery

class GalleryListSL(serializers.ModelSerializer):
	class Meta:
		model = Gallery
		fields = [
			'img_name'
		]