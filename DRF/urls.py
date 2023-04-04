from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from rest_framework_swagger.views import get_swagger_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls', namespace='blog')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/', include('user.urls', namespace='user')),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('blog_api.urls', namespace='blog_api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('shema/', get_schema_view(
        title="My API",
        description="API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs/', include_docs_urls(
        title="My API",
        description="API for all things …",
    ), name='docs'),
    # path('swagger-docs/', get_swagger_view(title='My API'), name='swagger-docs'),
]
