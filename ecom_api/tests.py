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

    def test_list_products(self):
        # Send a GET request to list all products
        url = reverse('ecom_api:products-list')
        response = self.client.get(url)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        self.assertEqual(len(response.data['results']), 2)

    def test_create_order(self):
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

    def test_create_product(self):  # Send a POST request to create a product
        url = reverse('ecom_api:products-list')
        data = {
            'name': 'Product 3',
            'description': 'Description 3',
            'category': self.category1.id,
            'price': 30.99
        }
        response = self.client.post(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check the product count
        self.assertEqual(Product.objects.filter(name=data['name']).count(), 0)

    def test_update_product(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Send a PUT request to update a product
        url = reverse('ecom_api:products-detail', args=[self.product1.id])
        data = {
            'name': 'Product 1',
            'description': 'Description 1',
            'category': self.category1.id,
            'price': 30.99
        }
        response = self.client.put(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check the product count
        self.assertEqual(Product.objects.filter(name=data['name']).count(), 1)

    def test_delete_product(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Send a DELETE request to delete a product
        url = reverse('ecom_api:products-detail', args=[self.product1.id])
        response = self.client.delete(url)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check the product count
        self.assertEqual(Product.objects.filter(name=self.product1.name).count(), 1)

    def test_create_category(self):
        # Send a POST request to create a category
        url = reverse('ecom_api:categories-list')
        data = {
            'name': 'Category 3'
        }
        response = self.client.post(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check the category count
        self.assertEqual(Category.objects.filter(name=data['name']).count(), 0)

    def test_update_category(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Send a PUT request to update a category
        url = reverse('ecom_api:categories-detail', args=[self.category1.id])
        data = {
            'name': 'Category 1'
        }
        response = self.client.put(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check the category count
        self.assertEqual(Category.objects.filter(name=data['name']).count(), 1)
