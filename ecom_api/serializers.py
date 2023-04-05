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


class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'products', 'created_at', 'updated_at']


class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'products', 'total_amount', 'created_at', 'updated_at']
