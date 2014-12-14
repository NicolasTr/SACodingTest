from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=255)

class Background(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=255)

class Scene(models.Model):
    description = models.CharField(max_length=255)
    background = models.ForeignKey('Character')

class Position(models.Model):
    scene = models.ForeignKey('Scene', related_name='positions')
    character = models.ForeignKey('Character')
    x = models.FloatField()
    y = models.FloatField()


