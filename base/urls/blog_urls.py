from django.urls import path
from base.views import blog_views as views

urlpatterns = [
    path('', views.getBlogs, name="blogs"),
    path('create/', views.createBlog, name="blog-create"),
    path('upload/', views.uploadImage, name="upload-image"),   
    path('<str:pk>/bdetails/', views.createBdetail, name="create-bdetail"),
    path('<str:pk>/', views.getBlog, name="blog"),

    path('update/<str:pk>/', views.updateBlog, name="blog-update"),
    path('delete/<str:pk>/', views.deleteBlog, name="blog-delete"),           
]