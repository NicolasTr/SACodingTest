from django.contrib import admin
from apps.canvas.models import Character, Background, Scene, Position, Story


class ReadOnlyMixin(object):
    pass
    # def has_add_permission(self, request, obj=None):
    #     return False
    #
    # def has_delete_permission(self, request, obj=None):
    #     return False

class CharacterAdmin(ReadOnlyMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'url')
admin.site.register(Character, CharacterAdmin)

class BackgroundAdmin(ReadOnlyMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'url')
admin.site.register(Background, BackgroundAdmin)

class SceneAdmin(ReadOnlyMixin, admin.ModelAdmin):
    pass
admin.site.register(Scene, SceneAdmin)

class PositionAdmin(ReadOnlyMixin, admin.ModelAdmin):
    pass
admin.site.register(Position, PositionAdmin)

class StoryAdmin(ReadOnlyMixin, admin.ModelAdmin):
    pass
admin.site.register(Story, StoryAdmin)
