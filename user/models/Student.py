from django.db import models
from .User import User


class Student(models.Model):
    branch = (
        (0, 'CSE'),
        (1, 'IT'),
        (2, 'CSE-AI'),
    )
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

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roll_no = models.CharField(max_length=11)
    reg_no = models.CharField(max_length=9, blank=False, null=False)
    branch = models.PositiveIntegerField(choices=branch, blank=False, null=False)
    admission_year = models.PositiveIntegerField()
    passing_year = models.PositiveIntegerField()
    year = models.PositiveIntegerField(choices=current_year)
