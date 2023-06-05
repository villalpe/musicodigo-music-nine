from django.urls import path
from base.views import resource_views as views

urlpatterns = [
    path('', views.getResources, name="resources"),
    path('create/', views.createResource, name="resource-create"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('<str:pk>/', views.getResource, name="resource"),
    path('update/<str:pk>/', views.updateResource, name="resource-update"),
    path('delete/<str:pk>/', views.deleteResource, name="resource-delete"),          
]