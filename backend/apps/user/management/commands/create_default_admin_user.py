from django.conf import settings
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Create default admin user'

    def handle(self, *args, **options):
        user, created = User.objects.get_or_create(username="admin@example.com")
        user.email = "admin@example.com"
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        if created:
            user.set_password("asdfgh")
        user.save()
