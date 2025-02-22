from django.db import models
from django.contrib.auth.models import (
		AbstractBaseUser,
		BaseUserManager,
	)

class UserManager(BaseUserManager):
	def create_user(self, email, full_name, mobile, password=None, is_active=True, is_staff=False, is_admin=False):
		if not email:
			raise ValueError("Users must have an email address.")
		if not password:
			raise ValueError("Users must have a password.")
		if not full_name:
			raise ValueError("Users must have a full name.")
		if not mobile:
			raise ValueError("Users must have a phone number.")
		user_obj = self.model(
				email = self.normalize_email(email),
				full_name = full_name,
				mobile = mobile
			)
		user_obj.set_password(password)
		user_obj.staff = is_staff
		user_obj.admin = is_admin
		user_obj.active = is_active
		user_obj.save(using=self._db)
		return user_obj

	def create_staffuser(self,email,full_name,mobile,password=None):
		user = self.create_user(
				email,
				full_name,
				mobile,
				password=password,
				is_staff=True
			)
		return user

	def create_superuser(self,full_name,email,mobile,password=None):
		user = self.create_user(
				email,
				full_name,
				mobile,
				password=password,
				is_staff=True,
				is_admin=True
			)
		return user

class User(AbstractBaseUser):
	email = models.EmailField(max_length=255, unique=True)
	full_name = models.CharField(max_length=255, blank=True, null=True)
	mobile = models.CharField(max_length=255, blank=True, null=True)
	active = models.BooleanField(default=True) #can login
	staff = models.BooleanField(default=False) #staff user non superuser
	admin = models.BooleanField(default=False) #superuser
	timestamp = models.DateField(auto_now_add=True,auto_now=False)

	USERNAME_FIELD = 'email' #username
	# USERNAME_FIELD and password field are required by default
	REQUIRED_FIELDS = ['full_name','mobile'] #['full_name'] # python manage.py createsupweruser

	objects = UserManager()

	def __str__(self):
		return self.email

	def get_full_name(self):
		return self.email

	def get_short_name(self):
		return self.email

	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	@property
	def is_staff(self):
		return self.staff

	@property
	def is_admin(self):
		return self.admin

	@property
	def is_active(self):
		return self.active
	