from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tasks
        fields= ('id','name','description','check_task','create_at')
        read_only_fields=('create_at',)