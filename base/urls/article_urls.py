from django.urls import path
from base.views import article_views

urlpatterns = [
    path('', article_views.getArticles, name="articles"),
    path('create/', article_views.createArticle, name="article-create"),
    path('upload/', article_views.uploadImage, name="image-upload"),
    path('<str:pk>/', article_views.getArticle, name="article"),
    path('update/<str:pk>/', article_views.updateArticle, name="article-update"),
    path('delete/<str:pk>/', article_views.deleteArticle, name="article-delete"),
]