# from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from blog.models import Category, Post
from django.contrib.auth.models import User
from django.urls import reverse


# Create your tests here.

class PostTests(APITestCase):

    def test_view_posts(self):
        """
        Ensure we can view a list of posts.
        """
        url = reverse('blog_api:posts-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        """
        Ensure we can create a new post object.
        """
        client = APIClient()

        self.test_category = Category.objects.create(name='django')
        self.test_user = User.objects.create_user(
            username='test_user1', password='123456789'
        )
        url = reverse('blog_api:posts-list')
        client.login(username=self.test_user.username, password='123456789')
        data = {
            'title': 'Test Title',
            'content': 'Test Content',
            'status': 'published',
            'category': self.test_category.id,
            'author': self.test_user.id
        }
        print(data)
        response = client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, 'Test Title')
