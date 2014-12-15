from django.contrib.auth.models import User
from django.db import models
from gadjo.requestprovider.signals import get_request
from django_extensions.db.models import TimeStampedModel


class Character(models.Model):
    name = models.CharField(max_length=50, blank=False)
    url = models.CharField(max_length=255, blank=False)

class Background(models.Model):
    name = models.CharField(max_length=50, blank=False)
    url = models.CharField(max_length=255, blank=False)

class Scene(models.Model):
    story = models.ForeignKey('Story', related_name='scenes', blank=False)
    description = models.CharField(max_length=255, blank=False)
    background = models.ForeignKey('Background', blank=False)

class Position(models.Model):
    scene = models.ForeignKey('Scene', related_name='positions', blank=False)
    character = models.ForeignKey('Character', blank=False)
    x = models.FloatField(blank=False)
    y = models.FloatField(blank=False)

class Story(TimeStampedModel, models.Model):
    user = models.ForeignKey(User, related_name='stories', blank=False)

    class Meta:
        verbose_name_plural = "stories"

