from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post, Category


class TestCreatePost(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_category = Category.objects.create(name='django')

        testuser1 = User.objects.create_user(
            username='test_user1', password='123456789')
        testuser1.save()

        test_post = Post.objects.create(
            category=test_category, title='Post Title', excerpt='Post Excerpt',
            content='Post Content', slug='post-title', author_id=1,
            status='published')
        test_post.save()

    def test_blog_content(self):
        post = Post.objects.get(id=1)
        category = Category.objects.get(id=1)
        author = f'{post.author}'
        title = f'{post.title}'
        excerpt = f'{post.excerpt}'
        content = f'{post.content}'
        status = f'{post.status}'
        self.assertEqual(author, 'test_user1')
        self.assertEqual(title, 'Post Title')
        self.assertEqual(excerpt, 'Post Excerpt')
        self.assertEqual(content, 'Post Content')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), 'Post Title | test_user1')
        self.assertEqual(str(category), 'django')
