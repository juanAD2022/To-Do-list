from .models import Tasks
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset=Tasks.objects.all()
    permission_classes=[permissions.AllowAny]
    serializer_class = TaskSerializer
    