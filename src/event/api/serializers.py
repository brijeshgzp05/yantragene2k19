from rest_framework import serializers
from django.contrib.auth import get_user_model
from event.models import Event, Participant
User = get_user_model()


class EventDetailSL(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = [
			'id',
			'ename',
			'epic',
			'econtent',
			'slug',
			'c1name',
			'c1pic',
			'c1mobile',
			'c2name',
			'c2pic',
			'c2mobile',
			'eintro',
			'max_size_of_team'
		]


class ParticipantSL(serializers.ModelSerializer):
	class Meta:
		model = Participant
		fields = [
			'id',
			'event',
			'user',
			'team_name',
			'other_mambers',
			'event_name'
		]
		read_only_fields = ('user',)

	def validate(self, data):
		event_obj = data.get('event')
		user =  self.context['request'].user
		user_obj = User.objects.get(email=user)
		checkList = Participant.objects.filter(event=event_obj, user=user_obj)
		if checkList.count():
			raise serializers.ValidationError("You have already participated")
		return data



class ParticipantDeleteSL(serializers.ModelSerializer):
	class Meta:
		model = Participant
		fields = [
			'id',
			'event',
			'user',
			'team_name',
			'other_mambers',
		]