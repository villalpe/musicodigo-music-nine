from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files import File
from base.models import Radio
from base.serializer import RadioSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getRadios(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    radios = Radio.objects.filter(name__icontains=query)
    serializer = RadioSerializer(radios, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRadio(request, pk):
    radio = Radio.objects.get(_id=pk)
    serializer = RadioSerializer(radio, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRadio(request):
    user = request.user
    radio = Radio.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
    )
    serializer = RadioSerializer(radio, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateRadio(request, pk):
    data = request.data
    radio = Radio.objects.get(_id=pk)

    radio.name = data['name']
    radio.author = data['author']
    radio.comment = data['comment']

    radio.save()            

    serializer = RadioSerializer(radio, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRadio(request, pk):
    radio = Radio.objects.get(_id=pk)
    radio.delete()
    return Response('Radio was deleted')

@api_view(['POST'])
def uploadFile(request):
    data = request.data

    radio_id = data['radio_id']
    radio = Radio.objects.get(_id=radio_id)

    radio.audio_file = request.FILES.get('audio_file')
    radio.save()

    return Response('File was uploaded')