from rest_framework import serializers
from apps.canvas.models import Story, Scene, Background, Character, Position
from apps.user.serializers import UserSerializer


class PublicBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Background
        fields = ('id', 'name', 'url')
        read_only_fields = ('id', 'name', 'url')

    def restore_object(self, attrs, instance=None):
        object = super(PublicBackgroundSerializer, self).restore_object(attrs, instance)
        print attrs, object
        return object

class PublicCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'name', 'url')
        read_only_fields = ('id', 'name', 'url')


class PositionSerializer(serializers.ModelSerializer):
    character = serializers.PrimaryKeyRelatedField(queryset=Character.objects.all())

    class Meta:
        model = Position
        fields = ('id', 'character', 'x', 'y')


class PublicPositionSerializer(serializers.ModelSerializer):
    character = PublicCharacterSerializer()

    class Meta:
        model = Position
        fields = ('id', 'character', 'x', 'y')


class PublicSceneSerializer(serializers.ModelSerializer):
    background = PublicBackgroundSerializer()
    positions = PublicPositionSerializer(many=True)

    class Meta:
        model = Scene
        fields = ('id', 'description', 'background', 'positions')


class SceneSerializer(serializers.ModelSerializer):
    background = serializers.PrimaryKeyRelatedField(queryset=Background.objects.all())
    positions = PositionSerializer(many=True)

    class Meta:
        model = Scene
        fields = ('id', 'description', 'background', 'positions')


class PublicStorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    scenes = PublicSceneSerializer(many=True)

    class Meta:
        model = Story
        fields = ('id', 'user', 'scenes')


class StorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    scenes = SceneSerializer(many=True)

    class Meta:
        model = Story
        fields = ('id', 'user', 'scenes')
