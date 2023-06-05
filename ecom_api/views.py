from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Category, Product, Cart, Order
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, OrderSerializer
from .permissions import IsOwnerOrReadOnly, IsOwnerRead
from .paginations import CustomCursorPagination
from rest_framework.throttling import UserRateThrottle
from rest_framework import serializers
# from .filters import ProductFilter


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list:
    Return a list of all the existing products.

    retrieve:
    Return the given product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomCursorPagination
    filter_backends = [SearchFilter]
    search_fields = ['name', 'category__name']
    throttle_classes = [UserRateThrottle]
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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return self.queryset
        return Category.objects.none()


class CartViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerRead]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = CustomCursorPagination
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # check if the quantity is not zero or negative
        if serializer.validated_data['quantity'] <= 0:
            raise serializers.ValidationError(
                {'message': "Quantity must be greater than zero"},
                code=400
            )
        # check if log in user has money to pay for the order
        total_price = serializer.validated_data['product'].price * serializer.validated_data['quantity']
        if self.request.user.balance >= total_price:
            serializer.save(user=self.request.user, total_price=total_price)
            cart = Cart.objects.get_or_create(user=self.request.user)[0]
            self.request.user.balance -= total_price
            cart.orders.add(serializer.instance)
            self.request.user.save()
        else:
            raise serializers.ValidationError(
                {'message': "You don't have enough money to pay for this order"},
                code=400
            )

    def perform_destroy(self, instance):
        self.request.user.balance += instance.total_price
        cart = Cart.objects.get_or_create(user=self.request.user)[0]
        cart.orders.remove(instance)
        self.request.user.save()
        instance.delete()
