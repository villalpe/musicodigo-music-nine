from django.urls import path
from base.views import topic_views

urlpatterns = [
    path('', topic_views.getTopics, name="topics"),
    path('create/', topic_views.createTopic, name="topic-create"),
    path('upload/', topic_views.uploadImage, name="image-upload"),
    path('<str:pk>/', topic_views.getTopic, name="topic"),
    path('update/<str:pk>/', topic_views.updateTopic, name="topic-update"),
    path('delete/<str:pk>/', topic_views.deleteTopic, name="topic-delete"),
]
