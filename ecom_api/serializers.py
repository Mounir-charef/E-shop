from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=[])
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'category_name', 'price', 'image', 'status']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class OrderSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.CharField(source='product.price', read_only=True)
    product_image = serializers.CharField(source='product.image', read_only=True)

    @staticmethod
    def get_total_price(obj):
        return obj.product.price * obj.quantity

    class Meta:
        model = Order
        fields = ['id', 'user', 'product',
                  'product_name', 'product_price', 'product_image',
                  'quantity', 'total_price', 'created_at', 'updated_at']


class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'orders', 'created_at', 'updated_at']
