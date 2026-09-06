from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Project
from base.serializer import ProjectSerializer
import cloudinary.uploader

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getProjects(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    projects = Project.objects.filter(name__icontains=query)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProject(request, pk):
    project = Project.objects.get(_id=pk)
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProject(request):
    user = request.user
    project = Project.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
        time_proj = 0,
    )
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProject(request, pk):
    data = request.data
    project = Project.objects.get(_id=pk)

    project.name = data['name']
    project.author = data['author']
    project.comment = data['comment']
    project.time_proj = data['time_proj']

    project.save()            

    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProject(request, pk):
    project = Project.objects.get(_id=pk)
    project.delete()
    return Response('Project was deleted')

@api_view(['POST'])
def uploadFile(request):
    data = request.data
    project_id = data.get('project_id')
    project = Project.objects.get(_id=project_id)

    f = request.FILES.get('video_file')
    if not f:
        return Response({"detail": "No video_file provided"}, status=status.HTTP_400_BAD_REQUEST)

    result = cloudinary.uploader.upload(
        f,
        resource_type="video",
        folder="projects/videos"
    )

    project.video_file = result.get("secure_url")
    project.save()

    return Response({"url": result.get("secure_url")}, status=status.HTTP_200_OK)
