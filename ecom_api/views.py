from rest_framework import viewsets, pagination
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from .permissions import IsOwnerOrReadOnly


class CustomCursorPagination(pagination.CursorPagination):
    page_size = 10
    ordering = '-created_at'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomCursorPagination
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
