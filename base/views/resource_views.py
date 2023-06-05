from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Resource
from base.serializer import ResourceSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getResources(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    resources = Resource.objects.filter(name__icontains=query)
    serializer = ResourceSerializer(resources, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getResource(request, pk):
    resource = Resource.objects.get(_id=pk)
    serializer = ResourceSerializer(resource, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createResource(request):
    user = request.user
    resource = Resource.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
        time_proj = 0,
    )
    serializer = ResourceSerializer(resource, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateResource(request, pk):
    data = request.data
    resource = Resource.objects.get(_id=pk)

    resource.name = data['name']
    resource.author = data['author']
    resource.comment = data['comment']
    resource.time_proj = data['time_proj']

    resource.save()            

    serializer = ResourceSerializer(resource, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteResource(request, pk):
    resource = Resource.objects.get(_id=pk)
    resource.delete()
    return Response('Resource was deleted')

@api_view(['POST'])
def uploadFile(request):
    data = request.data

    resource_id = data['resource_id']
    resource = Resource.objects.get(_id=resource_id)

    resource.video_file = request.FILES.get('video_file')
    resource.save()

    return Response('File was uploaded')