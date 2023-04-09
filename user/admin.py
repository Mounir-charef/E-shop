from django.contrib import admin
from user.models import User
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('=id', 'email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('id', 'email', 'user_name', 'first_name',
                    'image_url', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'user_name', 'first_name', 'image_url')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    # formfield_overrides = {
    #     models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    # }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
