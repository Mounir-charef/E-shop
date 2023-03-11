from django.urls import path
from .views import PostList, PostDetail

app_name = 'blog_api'

urlpatterns = [
    path('', PostList.as_view(), name='list_create'),
    path('<int:pk>/', PostDetail.as_view(), name='detail_create')
]
