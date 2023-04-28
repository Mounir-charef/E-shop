from django.urls import path
from django.views.generic import TemplateView

app_name = 'ecom'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('<str:pk>', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('profil/', TemplateView.as_view(template_name='index.html')),
]

