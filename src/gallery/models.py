from django.db import models

# Create your models here.
class Gallery(models.Model):
	img_name = models.ImageField(upload_to='images/gallery', blank=True)

	def __str__(self):
		return str(self.img_name)