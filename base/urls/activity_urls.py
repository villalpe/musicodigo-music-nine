from django.urls import path
from base.views import activity_views as views

urlpatterns = [
    path('', views.getActivitys, name="activitys"),
    path('<str:pk>/', views.getActivity, name="activity"),        
]