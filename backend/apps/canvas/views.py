from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from apps.canvas.models import Story
from apps.canvas.serializers import StorySerializer, PublicStorySerializer
from rest_framework import status
from rest_framework.response import Response


class StoryViewSet(mixins.CreateModelMixin, GenericViewSet):

    permission_classes = (IsAuthenticated,)
    serializer_class = StorySerializer
    model = Story

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.DATA, files=request.FILES)

        if serializer.is_valid():
            serializer.object.user = request.user
            print 'scenes', serializer.object
            self.pre_save(serializer.object)
            self.object = serializer.save(force_insert=True)
            self.post_save(self.object, created=True)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicStoryViewSet(mixins.ListModelMixin, GenericViewSet):

    permission_classes = (AllowAny,)
    serializer_class = PublicStorySerializer
    queryset = Story.objects.all().order_by('-modified')
