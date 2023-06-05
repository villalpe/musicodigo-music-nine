from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Grupo
from base.serializer import GrupoSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getGrupos(request):
    grupos = Grupo.objects.all()
    serializer = GrupoSerializer(grupos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getGrupo(request, pk):
    grupo = Grupo.objects.get(_id=pk)
    serializer = GrupoSerializer(grupo, many=False)
    return Response(serializer.data)