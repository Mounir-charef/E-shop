from rest_framework import pagination


class CustomCursorPagination(pagination.CursorPagination):
    page_size = 10
    ordering = '-created_at'
