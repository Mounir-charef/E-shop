from faker import Faker
from ecom_api.models import Category, Product, Cart, Order
from django.contrib.auth import get_user_model
from faker.providers import DynamicProvider


def run():
    User = get_user_model()
    fake = Faker()

    category_names = ['Tech', 'Shoes', 'Phones', 'Clothing',
                      'Beauty', 'Home', 'Books', 'Toys', 'Sports', 'Food']
    fake_categories_provider = DynamicProvider(
        provider_name='categories',
        elements=category_names,
    )
    fake.add_provider(fake_categories_provider)

    # Create 10 users
    for _ in range(10):
        User.objects.create(
            user_name=fake.user_name(),
            first_name=fake.first_name(),
            email=fake.email(),
            password=fake.password(),
        )

    # Create categories
    for _ in range(5):
        Category.objects.create(
            name=fake.categories(),
        )

    # Create 10 products
    for _ in range(10):
        Product.objects.create(
            name=fake.commerce.product(),
            category=Category.objects.order_by('?').first(),
            price=fake.random_int(min=1, max=1000),
            description=fake.paragraph(nb_sentences=3),
        )

    # Create 10 carts
    for _ in range(10):
        Cart.objects.create(
            user=User.objects.order_by('?').first(),
        )

    # Create 10 orders
    for _ in range(10):
        Order.objects.create(
            user=User.objects.order_by('?').first(),
            total_amount=fake.random_int(min=1, max=1000),
        )

    # Add 5 random products to each cart
    for cart in Cart.objects.all():
        cart.products.set(Product.objects.order_by('?')[:5])

    # Add 5 random products to each order
    for order in Order.objects.all():
        order.products.set(Product.objects.order_by('?')[:5])

    print('Data created successfully')
