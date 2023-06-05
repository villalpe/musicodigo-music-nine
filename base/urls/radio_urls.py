from django.urls import path
from base.views import radio_views as views

urlpatterns = [
    path('', views.getRadios, name="radios"),
    path('create/', views.createRadio, name="recording-create"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('<str:pk>/', views.getRadio, name="radio"),
    path('update/<str:pk>/', views.updateRadio, name="radio-update"),
    path('delete/<str:pk>/', views.deleteRadio, name="radio-delete"),
]