"""reactify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token

from accounts.views import HelloView

urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('gallery/', TemplateView.as_view(template_name='react.html')),
    path('events/', TemplateView.as_view(template_name='react.html')),
    path('login/', TemplateView.as_view(template_name='react.html')),
    path('signup/', TemplateView.as_view(template_name='react.html')),
    path('profile/', TemplateView.as_view(template_name='react.html')),
    path('sponsors/', TemplateView.as_view(template_name='react.html')),
    path('contact-us/', TemplateView.as_view(template_name='react.html')),
    path('about-us/', TemplateView.as_view(template_name='react.html')),
    re_path('events/(?P<slug>[\w-]+)', TemplateView.as_view(template_name='react.html')),
    #re_path('(?P<username>[\w.@+-]+)', TemplateView.as_view(template_name='react.html')),





    path('admin/', admin.site.urls),
    path('api/gallery/', include("gallery.api.urls", namespace='gallery-api')),
    path('api/event/', include("event.api.urls", namespace='event-api')),
    path('api/accounts/', include("accounts.api.urls", namespace='accounts-api')),
    path('api/extra/', include("extra.api.urls", namespace='extra-api')),
    path('hello/', HelloView.as_view()),
    path('login/token-generate/', obtain_jwt_token),





] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
