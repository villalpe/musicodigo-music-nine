from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Blog, Bdetail
from base.serializer import BlogSerializer, BdetailSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getBlogs(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    blogs = Blog.objects.filter(name__icontains=query)
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getBlog(request, pk):
    blog = Blog.objects.get(_id=pk)
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlog(request):
    user = request.user
    blog = Blog.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
    )
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(_id=pk)

    blog.name = data['name']
    blog.author = data['author']
    blog.comment = data['comment']

    blog.save()            

    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, pk):
    blog = Blog.objects.get(_id=pk)
    blog.delete()
    return Response('Blog fue borrado')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBdetail(request, pk):
    user = request.user
    blog = Blog.objects.get(_id=pk)
    data = request.data

    #1.- BlogDetail already exist for the user
    #alreadyExist = blog.bdetail_set.filter(user=user).exists()

    #if alreadyExist:
    #    content = {'detail': 'Blog already reviewed'}
    #    return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2.- No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Selecciona un rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)        

    #3.- Creating a BlogDetail
    else:
        bdetail = Bdetail.objects.create(
            user = user,
            blog = blog,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        bdetails = blog.bdetail_set.all()
        blog.numReviews = len(bdetails)

        total = 0
        for i in bdetails:
            total += i.rating
        
        blog.rating = total / len(bdetails)
        blog.save()

        return Response('Blog Detail Added')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    blog_id = data['blog_id']
    blog = Blog.objects.get(_id=blog_id)

    blog.image = request.FILES.get('image')
    blog.save()

    return Response('Image was uploaded')
