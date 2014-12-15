from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from apps.canvas.views import StoryViewSet, PublicStoryViewSet
from apps.user.views import UserViewSet

router = DefaultRouter()
router.include_root_view = False
router.register('users', UserViewSet, base_name='users')
router.register('stories', StoryViewSet, base_name='stories')
router.register('gallery', PublicStoryViewSet, base_name='gallery')

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api/users/auth/', 'rest_framework_jwt.views.obtain_jwt_token'),

    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
