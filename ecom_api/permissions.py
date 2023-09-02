from rest_framework import permissions
from django.utils.translation import gettext as _

class IsOwnerOrReadOnly(permissions.BasePermission):
    message = _("Editing Products is restricted to the owner only.")
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsOwnerRead(permissions.BasePermission):
    message = "Only owner of object can access it"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

