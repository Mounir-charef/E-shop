from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from rest_framework_swagger.views import get_swagger_view

urlpatterns = [
    # React Frontend
    path('', include('ecom.urls', namespace='ecom')),

    # Ecom API
    path('api/', include('ecom_api.urls', namespace='ecom_api')),

    # Admin panel
    path('admin/', admin.site.urls),

    # Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User API
    path('api/user/', include('user.urls', namespace='user_api')),

    # Rest Auth
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),


    # Schema
    path('open/', get_schema_view(
        title="Ecom API",
        description="API for the E-Shop market",
        version="1.0.1"
    ), name='eshop-schema'),


    # Docs
    path('docs/', include_docs_urls(
        title="Ecom API",
        description="API for the E-Shop market",
    ), name='eshop-docs'),
    # path('swagger-docs/', get_swagger_view(title='My API'), name='swagger-docs'),

    # Static files
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) +\
    static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
