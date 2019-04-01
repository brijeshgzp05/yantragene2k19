from django.db import models

# Create your models here.

class ContactUs(models.Model):
	name = models.CharField(max_length=255)
	email = models.EmailField()
	feedback = models.TextField()

	def __str__(self):
		return self.name

