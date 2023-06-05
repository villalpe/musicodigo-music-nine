from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Activity
from base.serializer import ActivitySerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getActivitys(request):
    activitys = Activity.objects.all()
    serializer = ActivitySerializer(activitys, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getActivity(request, pk):
    activity = Activity.objects.get(_id=pk)
    serializer = ActivitySerializer(activity, many=False)
    return Response(serializer.data)