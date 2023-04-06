from django.contrib.auth import get_user_model
from ecom_api.models import Category, Product, Cart, Order


def run():
    # Delete all users, categories, products, carts, orders, but keep the admin user
    User = get_user_model()
    User.objects.exclude(is_superuser=True).delete()
    Category.objects.all().delete()
    Product.objects.all().delete()
    Cart.objects.all().delete()
    Order.objects.all().delete()

