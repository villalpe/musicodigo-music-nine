from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.response import Response
from base.models import Profile
from base.serializer import ProfileSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getProfiles(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    profiles = Profile.objects.filter(name__icontains=query)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProfile(request, pk):
    profile = Profile.objects.get(_id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfileById(request, pk):
    user = request.user
    profile = Profile.objects.get(_id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyProfile(request):
    user = request.user
    profile = user.profile_set.all()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProfile(request):
    user = request.user
    profile = Profile.objects.create(
        user = user,
        name = 'Sample Name',
        bio = 'Sample Bio',
        comment = '',
    )
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request, pk):
    data = request.data
    profile = Profile.objects.get(_id=pk)

    profile.name = data['name']
    profile.bio = data['bio']
    profile.comment = data['comment']

    profile.save()            

    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProfile(request, pk):
    profile = Profile.objects.get(_id=pk)
    profile.delete()
    return Response('Profile fué borrado')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    profile_id = data['profile_id']
    profile = Profile.objects.get(_id=profile_id)

    profile.image = request.FILES.get('image')
    profile.save()

    return Response('Imagen fué subida')