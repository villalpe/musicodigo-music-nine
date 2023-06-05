from django.urls import path
from base.views import podcast_views as views

urlpatterns = [
    path('', views.getPodcasts, name="podcasts"),
    path('create/', views.createPodcast, name="podcast-create"),
    path('upload/', views.uploadImage, name="upload-image"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('<str:pk>/', views.getPodcast, name="podcast"),
    path('update/<str:pk>/', views.updatePodcast, name="podcast-update"),
    path('delete/<str:pk>/', views.deletePodcast, name="podcast-delete"),          
]