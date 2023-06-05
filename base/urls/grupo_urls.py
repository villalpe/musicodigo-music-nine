from django.urls import path
from base.views import grupo_views as views

urlpatterns = [
    path('', views.getGrupos, name="grupos"),
    path('<str:pk>/', views.getGrupo, name="grupo"),        
]