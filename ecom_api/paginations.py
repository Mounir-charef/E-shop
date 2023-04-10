from rest_framework import pagination


class CustomCursorPagination(pagination.CursorPagination):
    page_size = 15
    ordering = '-created_at'
