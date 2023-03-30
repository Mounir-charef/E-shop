from rest_framework import generics
from blog.models import Post
from .serilizers import PostSerializer
from .pagination import StandardResultsSetPagination


class PostList(generics.ListCreateAPIView):
    queryset = Post.posts.all()
    serializer_class = PostSerializer
    # pagination_class = StandardResultsSetPagination


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
