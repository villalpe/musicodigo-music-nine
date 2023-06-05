#from ast import FormattedValue
#from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField


# Create your models here.

class Grupo(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)    
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='images',default="images/placeholder.png")
    category = models.CharField(max_length=200, null=True, blank=True)
    subcategory = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class Review(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    bio = models.TextField(null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)        

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')    
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class Bdetail(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.blog)

class Podcast(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    podcast = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    audio_file = models.FileField(null=True, blank=True)
    time_pod = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    transcription = models.TextField(null=True, blank=True)     
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class Bookmark(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bookmark = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)    
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(null=True, blank=True)       
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.bookmark)

class Forum(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    forum = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')    
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class File(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    file = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)    
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(null=True, blank=True)   
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.file)

class Topic(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    comment_rtf = RichTextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)      
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class Activity(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    bookmark = models.ForeignKey(Bookmark, on_delete=models.SET_NULL, null=True)
    forum = models.ForeignKey(Forum, on_delete=models.SET_NULL, null=True)
    file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True)
    activity = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(null=True, blank=True)   
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.activity)

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    video_file = models.FileField(null=True, blank=True)
    time_proj = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class Resource(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    video_file = models.FileField(null=True, blank=True)
    time_proj = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)                

class Recording(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    licencia = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    audio_file = models.FileField(null=True, blank=True)
    zip_file = models.FileField(null=True, blank=True)
    time_rec = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Radio(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    audio_file = models.FileField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    comment_rtf = RichTextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)      
    createdAt = models.DateTimeField(auto_now_add=True)    
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)