# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations

def add_backgrounds(apps, schema_editor):
    Background = apps.get_model("canvas", "Background")

    def add_background(name, url):
        background = Background(name=name, url=url)
        background.save()

    add_background('Shed', 'images/backgrounds/1.jpg')
    add_background('Grass', 'images/backgrounds/2.jpg')
    add_background('Glass building', 'images/backgrounds/3.jpg')
    add_background('Sea', 'images/backgrounds/4.jpg')
    add_background('Beach', 'images/backgrounds/5.jpg')
    add_background('Stones', 'images/backgrounds/6.jpg')
    add_background('Trees', 'images/backgrounds/7.jpg')
    add_background('City', 'images/backgrounds/8.jpg')
    add_background('Boxes', 'images/backgrounds/9.jpg')

class Migration(migrations.Migration):

    dependencies = [
        ('canvas', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_backgrounds),
    ]
