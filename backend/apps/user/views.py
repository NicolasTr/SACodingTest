from rest_framework import mixins
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from apps.user.serializers import UserSerializer


class UserViewSet(mixins.CreateModelMixin, GenericViewSet):

    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
