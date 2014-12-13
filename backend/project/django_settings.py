import os
from getenv import env

import dotenv
import socket
dotenv.read_dotenv()

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = env('DJANGO_SECRET_KEY', 'DEV_DJANGO_SECRET_KEY')

DEBUG = env('DEBUG', False) == True
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = (
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_extensions',
    'raven.contrib.django.raven_compat',
    'rest_framework',

    'apps.authentication',
    'apps.canvas',
)

GRAPPELLI_ADMIN_TITLE = "SA Coding Test Admin"

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.request",
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}

ROOT_URLCONF = 'project.django_urls'

WSGI_APPLICATION = 'project.django_wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('POSTGRES_1_ENV_POSTGRESQL_DB'),
        'USER': env('POSTGRES_1_ENV_POSTGRESQL_USER'),
        'PASSWORD': env('POSTGRES_1_ENV_POSTGRESQL_PASS'),
        'HOST': env('POSTGRES_1_PORT_5432_TCP_ADDR'),
        'PORT': env('POSTGRES_1_PORT_5432_TCP_PORT'),
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/' if not DEBUG else '/admin/static/'
STATIC_ROOT = '/srv/frontend/dist/static/'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,

    'formatters': {
        'default': {
            'format': '[%(asctime)s][%(levelname)s] %(name)s %(filename)s:%(funcName)s:%(lineno)d | %(message)s',
            'datefmt': '%H:%M:%S',
        },
    },

    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },

    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'default',
            'filters': ['require_debug_true'],
        },
        'sentry': {
            'level': 'ERROR',
            'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler',
            'filters': ['require_debug_false'],
        },
    },

    'loggers': {
        '': {
            'handlers': [
                'console',
                'sentry',
            ],
            'level': 'INFO',
            'propagate': True,
        },
    }
}

RAVEN_CONFIG = {
    'dsn': env('SENTRY_DSN', ''),
    'site': env('SENTRY_SITE', ''),
    'name': env('SENTRY_NAME', socket.gethostname())
}
