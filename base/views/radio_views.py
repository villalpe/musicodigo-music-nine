from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files import File
from base.models import Radio
from base.serializer import RadioSerializer
import cloudinary.uploader

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
    radio_id = data.get('radio_id')
    radio = Radio.objects.get(_id=radio_id)

    f = request.FILES.get('audio_file')
    if not f:
        return Response({"detail": "No audio_file provided"}, status=status.HTTP_400_BAD_REQUEST)

    result = cloudinary.uploader.upload(
        f,
        resource_type="video",   # Cloudinary usa "video" para audio también
        folder="radio/audio"
    )

    radio.audio_file = result.get("secure_url")
    radio.save()

    return Response({"url": result.get("secure_url")}, status=status.HTTP_200_OK)
