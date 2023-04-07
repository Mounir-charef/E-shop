from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Category, Product, Cart, Order
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, OrderSerializer
from .permissions import IsOwnerOrReadOnly
from .paginations import CustomCursorPagination
# from .filters import ProductFilter


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = CustomCursorPagination
    filter_backends = [SearchFilter]
    search_fields = ['name', 'category__name']
    # filter_backends = [DjangoFilterBackend]
    # filterset_class = ProductFilter
    # search_fields = ['name']

    def get_queryset(self):
        queryset = self.queryset
        # to add search functionality for both name and category if needed
        # search_query = self.request.query_params.get('search', None)
        # if search_query:
        #     queryset = queryset.filter(Q(name__icontains=search_query) | Q(category__name__icontains=search_query))
        return queryset


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return self.queryset
        return Category.objects.none()


class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = CustomCursorPagination
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = CustomCursorPagination
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
