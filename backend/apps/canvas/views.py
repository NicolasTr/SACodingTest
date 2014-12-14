from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from apps.canvas.models import Story
from apps.canvas.serializers import StorySerializer


class StoryViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, GenericViewSet):

    permission_classes = (AllowAny,)
    serializer_class = StorySerializer
    model = Story
