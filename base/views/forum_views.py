from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Forum
from base.serializer import ForumSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getForums(request):
    forums = Forum.objects.all()
    serializer = ForumSerializer(forums, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getForum(request, pk):
    forum = Forum.objects.get(_id=pk)
    serializer = ForumSerializer(forum, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createForum(request):
    user = request.user
    forum = Forum.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
    )
    serializer = ForumSerializer(forum, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateForum(request, pk):
    data = request.data
    forum = Forum.objects.get(_id=pk)

    forum.name = data['name']
    forum.author = data['author']
    forum.comment = data['comment']

    forum.save()            

    serializer = ForumSerializer(forum, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteForum(request, pk):
    forum = Forum.objects.get(_id=pk)
    forum.delete()
    return Response('Forum was deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    forum_id = data['forum_id']
    forum = Forum.objects.get(_id=forum_id)

    forum.image = request.FILES.get('image')
    forum.save()

    return Response('Image was uploaded')