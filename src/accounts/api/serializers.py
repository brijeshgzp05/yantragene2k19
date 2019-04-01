from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.serializers import (
	ModelSerializer
	)

User = get_user_model()

class UserCreateSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = [
			'full_name',
			'email',
			'mobile',
			'password',
		]
		extra_kwargs = {
			"password":{
				"write_only":True
			}
		}

	def create(self,validated_data):
		email = validated_data['email']
		password = validated_data['password']
		full_name = validated_data['full_name']
		mobile = validated_data['mobile']
		user_obj = User(
			email=email,
			full_name=full_name,
			mobile=mobile,
			)
		user_obj.set_password(password)
		user_obj.save()
		# email code
		subject = 'Yantragene 2k19 '
		message = 'Hi '+full_name+ ', thanks for your registration on yantragene 2k19.\n\nThis email may help you in case you forgot your password.\n\nYour email : '+email+'.\nYour password : '+ password+'.'
		from_email = settings.EMAIL_HOST_USER
		to_list = [user_obj.email]
		send_mail(subject,message,from_email,to_list,fail_silently=True)

		return validated_data


class UserNameGetterSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = [
			'full_name',
			'id',
			'email',
			'mobile',
		]
		