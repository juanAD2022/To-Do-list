from django.db import models

# Create your models here.
class Tasks(models.Model):
    name=models.CharField(max_length=20)
    description=models.TextField()
    check_task=models.BooleanField(default=True)
    create_at=models.DateTimeField(auto_now_add=True)
    