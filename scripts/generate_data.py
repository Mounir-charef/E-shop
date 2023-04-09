import factory
from factory.faker import Faker
from ecom_api.models import Category, Product, Cart, Order
from django.contrib.auth import get_user_model

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    user_name = Faker('user_name')
    first_name = Faker('first_name')
    email = Faker('email')
    password = Faker('password')


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = Faker('categories')


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = Faker('commerce.product')
    category = factory.SubFactory(CategoryFactory)
    price = Faker('random_int', min=1, max=1000)
    description = Faker('paragraph', nb_sentences=3)
    image = Faker('image_url')


class CartFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Cart

    user = factory.SubFactory(UserFactory)


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory)
    quantity = Faker('random_int', min=1, max=1000)


def run():
    for _ in range(10):
        UserFactory()

    for _ in range(5):
        CategoryFactory()

    for _ in range(10):
        ProductFactory()

    for _ in range(10):
        CartFactory()

    for _ in range(10):
        OrderFactory()

    for cart in Cart.objects.all():
        cart.products.set(Product.objects.order_by('?')[:5])

    for order in Order.objects.all():
        order.products.set(Product.objects.order_by('?')[:5])
