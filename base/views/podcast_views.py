from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Podcast
from base.serializer import PodcastSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getPodcasts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    podcasts = Podcast.objects.filter(name__icontains=query).order_by('createdAt')
    serializer = PodcastSerializer(podcasts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPodcast(request, pk):
    podcast = Podcast.objects.get(_id=pk)
    serializer = PodcastSerializer(podcast, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPodcast(request):
    user = request.user
    podcast = Podcast.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
        time_pod = 0,
        transcription = '',
    )
    serializer = PodcastSerializer(podcast, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePodcast(request, pk):
    data = request.data
    podcast = Podcast.objects.get(_id=pk)

    podcast.name = data['name']
    podcast.author = data['author']
    podcast.comment = data['comment']
    podcast.time_pod = data['time_pod']
    podcast.transcription = data['transcription']

    podcast.save()            

    serializer = PodcastSerializer(podcast, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePodcast(request, pk):
    podcast = Podcast.objects.get(_id=pk)
    podcast.delete()
    return Response('Podcast was deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    podcast_id = data['podcast_id']
    podcast = Podcast.objects.get(_id=podcast_id)

    podcast.image = request.FILES.get('image')
    podcast.save()

    return Response('Image was uploaded')

@api_view(['POST'])
def uploadFile(request):
    data = request.data

    podcast_id = data['podcast_id']
    podcast = Podcast.objects.get(_id=podcast_id)

    podcast.audio_file = request.FILES.get('audio_file')
    podcast.save()

    return Response('File was uploaded')        