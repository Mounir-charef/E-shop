from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=[])

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'price', 'image', 'status']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'product', 'quantity', 'created_at', 'updated_at']


class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'orders', 'created_at', 'updated_at']
