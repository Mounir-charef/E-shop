# from rest_framework import generics
# from django.shortcuts import get_object_or_404
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from blog.models import Post
from blog.permissions import PostUserWritePermission
from .serilizers import PostSerializer
from . import pagination
from rest_framework import viewsets
from rest_framework.filters import SearchFilter


class PostViewSet(viewsets.ModelViewSet):
    """
        Returns a list of all **published** posts in the system.
    """
    serializer_class = PostSerializer
    pagination_class = pagination.OptimizedPagination
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['title', 'slug', 'author__user_name']

    def get_queryset(self):
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return Post.posts.all()
        return self.queryset

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         permission_classes = [PostUserWritePermission]
    #     else:
    #         permission_classes = [IsAuthenticated]
    #     return [permission() for permission in permission_classes]

# class PostList(generics.ListCreateAPIView):
#     queryset = Post.posts.all()
#     serializer_class = PostSerializer
#     # pagination_class = StandardResultsSetPagination
#
#
# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer


# class PostViewSet(viewsets.ViewSet, pagination.OptimizedPagination):
#     permission_classes = [IsAuthenticated]
#     queryset = Post.posts.all()
#     serializer_class = PostSerializer
#
#     def list(self, request):
#         page = self.paginate_queryset(self.queryset, request, view=self)
#         if page is not None:
#             serializer = self.serializer_class(page, many=True)
#             return self.get_paginated_response(serializer.data)
#         serializer = self.serializer_class(self.queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer = self.serializer_class(post)
#         return Response(serializer.data)


# def get_object(self):
#     queryset = self.filter_queryset(Post.objects.all())
#     lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
#     assert lookup_url_kwarg in self.kwargs, (
#             'Expected view %s to be called with a URL keyword argument '
#             'named "%s". Fix your URL conf, or set the `.lookup_field` '
#             'attribute on the view correctly.' %
#             (self.__class__.__name__, lookup_url_kwarg)
#     )
#     filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
#     obj = get_object_or_404(queryset, **filter_kwargs)
#
#     # May raise a permission denied
#     self.check_object_permissions(self.request, obj)
#
#     return obj
