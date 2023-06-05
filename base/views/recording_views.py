from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files import File
from base.models import Recording
from base.serializer import RecordingSerializer
from django.db.models import Q

# Create your views here.
from rest_framework import status
import boto3

@api_view(['GET'])
def getRecordings(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    recordings = Recording.objects.filter(name__icontains=query)
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRecording(request, pk):
    recording = Recording.objects.get(_id=pk)
    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRecording(request):
    user = request.user
    recording = Recording.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        category = '',
        licencia = '',
        comment = '',
        time_rec = 0,
    )
    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateRecording(request, pk):
    data = request.data
    recording = Recording.objects.get(_id=pk)

    recording.name = data['name']
    recording.author = data['author']
    recording.category = data['category']
    recording.licencia = data['licencia']
    recording.comment = data['comment']
    recording.time_rec = data['time_rec']

    recording.save()            

    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRecording(request, pk):
    recording = Recording.objects.get(_id=pk)
    recording.delete()
    return Response('Recording was deleted')

@api_view(['GET'])
def getRecordingsByCategoryMA(request):
    recordings = Recording.objects.all().filter(Q(category='Muestras audio') | Q(category='Grabacion Muestras')).order_by('-createdAt')
    print(recordings)
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRecordingsByCategoryGE(request):
    recordings = Recording.objects.all().filter(Q(category='Grabaciones estéreo') | Q(category='Grabacion Instrumentos')).order_by('-createdAt')
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRecordingsByCategoryGM(request):
    recordings = Recording.objects.all().filter(Q(category='Grabaciones multicanal') | Q(category='Grabacion Multicanal')).order_by('-createdAt')
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)    

@api_view(['GET'])
def getRecordingsByCategoryRM(request):
    recordings = Recording.objects.all().filter(category='Remixes').order_by('-createdAt')
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def uploadFile(request):
    data = request.data

    recording_id = data['recording_id']
    recording = Recording.objects.get(_id=recording_id)

    recording.audio_file = request.FILES.get('audio_file')
    recording.save()

    return Response('File was uploaded')        

@api_view(['POST'])
def uploadZipFile(request):
    data = request.data

    recording_id = data['recording_id']
    recording = Recording.objects.get(_id=recording_id)

    recording.zip_file = request.FILES.get('zip_file')
    recording.save()

    return Response('ZipFile was uploaded')

@api_view(['GET'])
def DownloadAudioFile(request, pk):
    recording = Recording.objects.get(_id=pk)
    audio_file = str(recording.audio_file)
    s3 = boto3.client('s3', region_name='us-west-1', aws_access_key_id='AKIAWXACIR4CFCCT2T4N', aws_secret_access_key='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')
    bucket_name = "musicodigodemo-bucket"
    filename = audio_file
    s3.download_file(bucket_name, filename, format(filename))
    print(format(filename))
    f = open(format(filename), 'rb')
    audioFile = File(f)
    response = HttpResponse(audioFile.read())
    response['Content-Disposition'] = 'attachment';
    return response

@api_view(['GET'])
def DownloadZipFile(request, pk):
    recording = Recording.objects.get(_id=pk)
    zip_file = str(recording.zip_file)
    s3 = boto3.client('s3', region_name='us-west-1', aws_access_key_id='AKIAWXACIR4CFCCT2T4N', aws_secret_access_key='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')
    bucket_name = "musicodigodemo-bucket"
    filename = zip_file
    s3.download_file(bucket_name, filename, format(filename))
    print(format(filename))
    f = open(format(filename), 'rb')
    zipFile = File(f)
    response = HttpResponse(zipFile.read())
    response['Content-Disposition'] = 'attachment';
    return response           