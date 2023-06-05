from django.urls import path
from base.views import profile_views as views

urlpatterns = [
    path('', views.getProfiles, name="profiles"),
    path('create/', views.createProfile, name="profile-create"),
    path('upload/', views.uploadImage, name="upload-image"),   
    path('<str:pk>/', views.getProfileById, name='user-profile'),
    path('myprofile/', views.getMyProfile, name='myprofile'),

    path('update/<str:pk>/', views.updateProfile, name="profile-update"),
    path('delete/<str:pk>/', views.deleteProfile, name="profile-delete"),           
]