# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def add_characters(apps, schema_editor):
    Character = apps.get_model("canvas", "Character")

    def add_character(name, url):
        background = Character(name=name, url=url)
        background.save()

    add_character('Barbosa', 'images/vendor/images/chars/Barbosa.png')
    add_character('Bob Flying', 'images/vendor/images/chars/Bob_Flying.png')
    add_character('Buzz', 'images/vendor/images/chars/Buzz.png')
    add_character('Captain Jack', 'images/vendor/images/chars/CaptainJack.png')
    add_character('Dash', 'images/vendor/images/chars/Dash.png')
    add_character('Davy Jones', 'images/vendor/images/chars/DavyJones.png')
    add_character('Edna', 'images/vendor/images/chars/Edna.png')
    add_character('Francesco', 'images/vendor/images/chars/Francesco.png')
    add_character('Gibbs', 'images/vendor/images/chars/Gibbs.png')
    add_character('Helen', 'images/vendor/images/chars/Helen.png')
    add_character('Holly', 'images/vendor/images/chars/Holly.png')
    add_character('Jack Skellington', 'images/vendor/images/chars/JackSkellington.png')
    add_character('Jessie', 'images/vendor/images/chars/Jessie.png')
    add_character('Lone Ranger', 'images/vendor/images/chars/LoneRanger.png')
    add_character('Mater', 'images/vendor/images/chars/Mater.png')
    add_character('McQueen', 'images/vendor/images/chars/McQueen.png')
    add_character('Mike', 'images/vendor/images/chars/Mike.png')
    add_character('Perry', 'images/vendor/images/chars/Perry.png')
    add_character('Phineas', 'images/vendor/images/chars/Phineas.png')
    add_character('Ralph', 'images/vendor/images/chars/Ralph.png')
    add_character('Sully', 'images/vendor/images/chars/Sully.png')
    add_character('Syndrome', 'images/vendor/images/chars/Syndrome.png')
    add_character('Tonto', 'images/vendor/images/chars/Tonto.png')
    add_character('Violet', 'images/vendor/images/chars/Violet_2.png')
    add_character('Woody', 'images/vendor/images/chars/Woody.png')

class Migration(migrations.Migration):

    dependencies = [
        ('canvas', '0002_add_backgrounds'),
    ]

    operations = [
        migrations.RunPython(add_characters),
    ]
