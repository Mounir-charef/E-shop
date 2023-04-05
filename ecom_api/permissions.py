from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    message = "Editing Products is restricted to the owner only."

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the product
        return obj.user == request.user
