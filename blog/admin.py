from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'author', 'status', 'slug')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(models.Category)
