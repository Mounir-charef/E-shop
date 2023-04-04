from rest_framework.pagination import PageNumberPagination, CursorPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 1000
    ordering = '-published'


class OptimizedPagination(CursorPagination):
    page_size = 2
    ordering = '-published'


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000
