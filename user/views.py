from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class RetrieveUserView(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def get(request):
        try:
            user_data = RegisterUserSerializer(request.user).data
            return Response(user_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomUserCreate(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        try:
            serializer = RegisterUserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BlackListTokenUpdateView(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        try:
            token = RefreshToken(request.data["refresh_token"])
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
