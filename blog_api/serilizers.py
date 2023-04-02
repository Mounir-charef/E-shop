from rest_framework import serializers
from blog.models import Post


class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='author.user_name', read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'user_name', 'excerpt', 'content', 'published', 'status')