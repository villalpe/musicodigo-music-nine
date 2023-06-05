from django.urls import path
from base.views import forum_views as views

urlpatterns = [
    path('', views.getForums, name="forums"),
    path('create/', views.createForum, name="forum-create"),
    path('upload/', views.uploadImage, name="upload-image"),   
    path('<str:pk>/', views.getForum, name="forum"),

    path('update/<str:pk>/', views.updateForum, name="forum-update"),
    path('delete/<str:pk>/', views.deleteForum, name="forum-delete"),           
]