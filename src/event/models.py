from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Event(models.Model):
	ename = models.CharField(max_length=120)
	slug = models.SlugField(unique=True)
	epic = models.ImageField(upload_to='images/events', blank=True)
	eintro = models.TextField()
	econtent = models.TextField()
	max_size_of_team = models.IntegerField(default=1)
	c1name = models.CharField(max_length=255)
	c1pic = models.ImageField(upload_to='images/coordinators', blank=True)
	c1mobile = models.CharField(max_length=12)
	c2name = models.CharField(max_length=255)
	c2pic = models.ImageField(upload_to='images/coordinators', blank=True)
	c2mobile = models.CharField(max_length=12)

	def __str__(self):
		return self.ename

class Participant(models.Model):
	event = models.ForeignKey('Event', on_delete=models.CASCADE)
	event_name = models.CharField(max_length=40,default='algosense')
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	team_name = models.CharField(max_length=120)
	other_mambers = models.TextField(null=True,blank=True)

	def __str__(self):
		return self.team_name

