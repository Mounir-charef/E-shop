from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import Category, Product, Order

User = get_user_model()


class EcommerceAPITest(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(email='b@b.com', password='testpassword', user_name='testuser')

        # Create some categories
        self.category1 = Category.objects.create(name='Category 1')
        self.category2 = Category.objects.create(name='Category 2')

        # Create some products
        self.product1 = Product.objects.create(
            name='Product 1',
            description='Description 1',
            category=self.category1,
            price=10.99
        )
        self.product2 = Product.objects.create(
            name='Product 2',
            description='Description 2',
            category=self.category2,
            price=20.99
        )

        # Create an API client
        self.client = APIClient()

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user(self):
        # Send a GET request to retrieve the user data
        url = reverse('user:retrieve_user')
        response = self.client.get(url)
        print(response.data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        self.assertEqual(response.data['user_name'], 'Testuser')

    def test_list_products(self):
        # Send a GET request to list all products
        url = reverse('ecom_api:products-list')
        response = self.client.get(url)
        print(response.data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        self.assertEqual(len(response.data), 2)

    def test_create_order(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Send a POST request to create an order
        url = reverse('ecom_api:orders-list')
        data = {
            'product': self.product1.id,
            'quantity': 2
        }
        response = self.client.post(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check the order count for the user
        self.assertEqual(Order.objects.filter(product_id=data['product'], user=self.user).count(), 1)

    # Add more test cases for other endpoints and functionalities
