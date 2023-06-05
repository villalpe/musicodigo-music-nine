from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Project
from base.serializer import ProjectSerializer

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

    project_id = data['project_id']
    project = Project.objects.get(_id=project_id)

    project.video_file = request.FILES.get('video_file')
    project.save()

    return Response('File was uploaded')