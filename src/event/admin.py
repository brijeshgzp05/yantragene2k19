from django.contrib import admin

# Register your models here.
from .models import Event, Participant

class ParticipantAdmin(admin.ModelAdmin):
	list_display = ('event', 'user', 'team_name', 'other_mambers')
	list_filter = ('event', 'user')

admin.site.register(Event)
admin.site.register(Participant, ParticipantAdmin)