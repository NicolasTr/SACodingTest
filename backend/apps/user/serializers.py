from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        write_only_fields = ('password', )

    def validate_username(self, attrs, source):
        email = attrs.get(source)
        if not email:
            raise serializers.ValidationError('This field is required.')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return attrs

    def restore_object(self, attrs, instance=None):
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.email = user.username
        user.is_active = True
        user.set_password(attrs['password'])
        return user
