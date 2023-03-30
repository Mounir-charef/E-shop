from django.urls import path
from rest_framework import routers
from .views import PostViewSet

app_name = 'blog_api'

router = routers.DefaultRouter()
router.register('', PostViewSet, basename='posts')

urlpatterns = router.urls
