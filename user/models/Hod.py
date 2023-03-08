from django.db import models
from .User import User
from .Branch import Branch


class HOD(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    branch = models.OneToOneField(Branch, on_delete=models.CASCADE)

