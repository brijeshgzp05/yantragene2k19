from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
	message = "You must be the owner"
	def has_object_permission(self, request, view, obj):
		return obj.user==request.user

