"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
#from xml.dom.minidom import Document
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/grupos/', include('base.urls.grupo_urls')),
    path('api/blogs/', include('base.urls.blog_urls')),
    path('api/forums/', include('base.urls.forum_urls')),
    path('api/profiles/', include('base.urls.profile_urls')),
    path('api/podcasts/', include('base.urls.podcast_urls')),
    path('api/recordings/', include('base.urls.recording_urls')),
    path('api/radios/', include('base.urls.radio_urls')),
    path('api/articles/', include('base.urls.article_urls')),
    path('api/projects/', include('base.urls.project_urls')),
    path('api/topics/', include('base.urls.topic_urls')),    
    path('api/resources/', include('base.urls.resource_urls')),                  
    path('api/users/', include('base.urls.user_urls')),
    path('api/activity/', include('base.urls.activity_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
