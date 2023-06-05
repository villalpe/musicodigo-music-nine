from django.urls import path
from base.views import project_views as views

urlpatterns = [
    path('', views.getProjects, name="projects"),
    path('create/', views.createProject, name="project-create"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('<str:pk>/', views.getProject, name="project"),
    path('update/<str:pk>/', views.updateProject, name="project-update"),
    path('delete/<str:pk>/', views.deleteProject, name="project-delete"),          
]