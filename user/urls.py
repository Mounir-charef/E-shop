from django.urls import path
from .views import CustomUserCreate, BlackListTokenUpdateView, RetrieveUserView, AddBalanceView

app_name = 'user'

urlpatterns = [
    path('', RetrieveUserView.as_view(), name='retrieve_user'),
    path('add_balance/', AddBalanceView.as_view(), name='add_balance'),
    path('create/', CustomUserCreate.as_view(), name='create_user'),
    path('blacklist/', BlackListTokenUpdateView.as_view(), name='blacklist')
]
