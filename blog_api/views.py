# from rest_framework import generics
from blog.models import Post
from blog.permissions import PostUserWritePermission
from .serilizers import PostSerializer
from .pagination import StandardResultsSetPagination
from rest_framework import viewsets
from rest_framework.response import Response


# class PostList(generics.ListCreateAPIView):
#     queryset = Post.posts.all()
#     serializer_class = PostSerializer
#     # pagination_class = StandardResultsSetPagination
#
#
# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [PostUserWritePermission]
    pagination_class = StandardResultsSetPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(Post.posts.all())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     instance.views += 1
    #     instance.save()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
