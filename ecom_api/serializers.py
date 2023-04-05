from rest_framework import serializers
from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=[])

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'price', 'image', 'status']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
