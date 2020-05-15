from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    title = models.Charfield(max_length=255)
    content = models.TextField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
        