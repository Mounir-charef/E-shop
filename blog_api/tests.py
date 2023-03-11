from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from blog.models import Category
from django.contrib.auth.models import User
from django.urls import reverse


# Create your tests here.

class PostTests(APITestCase):

    def test_view_posts(self):
        """
        Ensure we can view a list of posts.
        """
        url = reverse('blog_api:list_create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        """
        Ensure we can create a new post object.
        """
        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_user(
            username='test_user1', password='123456789'
        )
        data = {
            'title': 'new',
            'author': 1,  # pk of test_user1
            'excerpt': 'new',
            'content': 'new',
            'category': 1  # pk of django
        }
        url = reverse('blog_api:list_create')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
