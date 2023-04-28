import requests
from ecom_api.models import Category, Product
from django.contrib.auth import get_user_model


def run():
    User = get_user_model()
    default_img = 'https://robohash.org/hicveldicta.png?size=50x50&set=set1'
    # Fetch data from dummyjson.com
    url = 'https://dummyjson.com/products?limit=200'
    response = requests.get(url)
    data = response.json()
    # Create new products for this category
    for product_data in data['products']:
        category, _ = Category.objects.get_or_create(name=product_data['category'])
        name = product_data['title']
        price = float(product_data['price'])
        description = product_data['description']
        image = product_data['thumbnail']
        images = product_data['images']
        Product.objects.create(
            name=name, category=category, price=price, description=description, image=image, images=images
        )

    # fetch users from dummyjson.com
    url = 'https://dummyjson.com/users?limit=25'
    response = requests.get(url)
    print(response.status_code)
    data = response.json()
    # Create new users
    for user_data in data['users']:
        username = user_data['username']
        password = user_data['password']
        first_name = user_data['firstName']
        image_url = user_data.get('image', default_img)
        email = user_data['email']
        User.objects.create_user(user_name=username, first_name=first_name,
                                 password=password, email=email, image_url=image_url)
