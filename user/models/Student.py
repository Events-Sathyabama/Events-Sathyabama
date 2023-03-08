from django.db import models
from .Branch import Branch
from .User import User


class Student(models.Model):
    current_year = (
        (1, '1st'),
        (2, '2nd'),
        (3, '3rd'),
        (4, '4th'),
        (5, '5th'),
        (6, '6th'),
    )
    # TODO add DP in the user model
    '''
    Fields in User Model
        email
        full_name
    '''

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_no = models.CharField(max_length=11)
    branch = models.OneToOneField(Branch, on_delete=models.CASCADE)
    admission_year = models.PositiveIntegerField()
    passing_year = models.PositiveIntegerField()
    year = models.PositiveIntegerField(choices=current_year)
