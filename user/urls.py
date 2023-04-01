from django.urls import path
from .views import CustomUserCreate, BlackListTokenUpdateView

app_name = 'user'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name='create_user'),
    path('blacklist/', BlackListTokenUpdateView.as_view(), name='blacklist')
]
