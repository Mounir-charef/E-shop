from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


class EcommerceAPITest(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(email='b@b.com', password='testpassword', user_name='testuser')
        # Create an API client
        self.client = APIClient()
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_create_user(self):
        # Send a POST request to create a user
        url = reverse('user:create_user')
        data = {
            'email': 'test@test.com',
            'password': 'testpassword',
            'user_name': 'Testuser'
        }
        response = self.client.post(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_user(self):
        # Send a GET request to retrieve the user data
        url = reverse('user:retrieve_user')
        response = self.client.get(url)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        self.assertEqual(response.data['user_name'], 'Testuser')

    def test_add_balance(self):
        # Send a POST request to add balance
        url = reverse('user:add_balance')
        data = {
            'amount': 100
        }
        response = self.client.patch(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the balance
        self.assertEqual(response.data['balance'], 50100)

        response = self.client.put(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Check exception when amount is a sting
        data = {
            'amount': '100'
        }
        response = self.client.patch(url, data)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['balance'], 50200)
