from rest_framework import generics
from blog.models import Post
from .serilizers import PostSerializer


class PostList(generics.ListCreateAPIView):
    queryset = Post.posts.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
