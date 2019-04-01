from rest_framework import serializers
from extra.models import ContactUs


class ContactCreateSL(serializers.ModelSerializer):
	class Meta:
		model = ContactUs
		fields = [
			'name',
			'email',
			'feedback',

		]

