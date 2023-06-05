from django.urls import path
from base.views import recording_views as views

urlpatterns = [
    path('', views.getRecordings, name="recordings"),
    path('bycategoryma/', views.getRecordingsByCategoryMA, name="recordings-bycategoryma"),
    path('bycategoryge/', views.getRecordingsByCategoryGE, name="recordings-bycategoryge"),
    path('bycategorygm/', views.getRecordingsByCategoryGM, name="recordings-bycategorygm"),
    path('bycategoryrm/', views.getRecordingsByCategoryRM, name="recordings-bycategoryrm"),
    path('create/', views.createRecording, name="recording-create"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('uploadzip/', views.uploadZipFile, name="upload-zipfile"),
    path('downloadaudio/<str:pk>/', views.DownloadAudioFile, name='download_audio'),
    path('downloadzip/<str:pk>/', views.DownloadZipFile, name='download_zip'),
    path('<str:pk>/', views.getRecording, name="recording"),
    path('update/<str:pk>/', views.updateRecording, name="recording-update"),
    path('delete/<str:pk>/', views.deleteRecording, name="recording-delete"),
]