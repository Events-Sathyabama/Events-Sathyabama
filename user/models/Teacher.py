from django.db import models
from .User import User


class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


