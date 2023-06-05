from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#from .products import products
from base.models import Article
from base.serializer import ArticleSerializer

from rest_framework import status

@api_view(['GET'])
def getArticles(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    articles = Article.objects.filter(name__icontains=query).order_by('createdAt')
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getArticle(request, pk):
    article = Article.objects.get(_id=pk)
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createArticle(request):
    user = request.user
    article = Article.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment_rtf = '',
    )
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateArticle(request, pk):
    data = request.data
    article = Article.objects.get(_id=pk)

    article.name = data['name']
    article.author = data['author']
    article.comment_rtf = data['comment_rtf']

    article.save()            

    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteArticle(request, pk):
    article = Article.objects.get(_id=pk)
    article.delete()
    return Response('Blog fue borrado')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    article_id = data['article_id']
    article = Article.objects.get(_id=article_id)

    article.image = request.FILES.get('image')
    article.save()

    return Response('Image was uploaded')