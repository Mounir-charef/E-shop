from rest_framework import pagination


class CustomCursorPagination(pagination.CursorPagination):
    page_size = 1
    ordering = '-created_at'
