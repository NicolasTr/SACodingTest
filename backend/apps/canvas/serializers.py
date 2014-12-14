from rest_framework import serializers
from apps.canvas.models import Story, Scene, Background, Character, Position
from apps.user.serializers import UserSerializer


class BackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Background
        fields = ('id', 'name', 'url')
        read_only_fields = ('id', 'name', 'url')


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'name', 'url')
        read_only_fields = ('id', 'name', 'url')


class PositionSerializer(serializers.ModelSerializer):
    character = CharacterSerializer(read_only=True)

    class Meta:
        model = Position
        fields = ('id', 'character', 'x', 'y')


class SceneSerializer(serializers.ModelSerializer):
    background = BackgroundSerializer(read_only=True)
    positions = PositionSerializer(many=True)

    class Meta:
        model = Scene
        fields = ('id', 'description', 'background', 'positions')


class StorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    scenes = SceneSerializer(many=True)

    class Meta:
        model = Story
        fields = ('id', 'user', 'scenes')
