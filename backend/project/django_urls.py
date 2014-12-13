from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from apps.authentication.views import UserViewSet

router = DefaultRouter()
router.register('users', UserViewSet, base_name='users')

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api/users/auth/', 'rest_framework_jwt.views.obtain_jwt_token'),

    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
