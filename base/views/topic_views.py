from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#from .products import products
from base.models import Topic
from base.serializer import TopicSerializer

from rest_framework import status

@api_view(['GET'])
def getTopics(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    topics = Topic.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(topics, 4)

    try:
        topics = paginator.page(page)
    except PageNotAnInteger:
        topics = paginator.page(1)
    except EmptyPage:
        topics = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = TopicSerializer(topics, many=True)
    return Response({'topics': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopic(request, pk):
    topic = Topic.objects.get(_id=pk)
    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTopic(request):
    user = request.user
    topic = Topic.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment_rtf = '',
    )
    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTopic(request, pk):
    data = request.data
    topic = Topic.objects.get(_id=pk)

    topic.name = data['name']
    topic.author = data['author']
    topic.comment_rtf = data['comment_rtf']

    topic.save()            

    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTopic(request, pk):
    topic = Topic.objects.get(_id=pk)
    topic.delete()
    return Response('Tema fue borrado')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    topic_id = data['topic_id']
    topic = Topic.objects.get(_id=topic_id)

    topic.image = request.FILES.get('image')
    topic.save()

    return Response('Image was uploaded')
