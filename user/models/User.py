from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
from django.db import models
from django.utils import timezone
from django.utils.timesince import timesince
from .Branch import Branch
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password
import random
from mail import Mail
from django.conf import settings
from event_management.utils import JWT

otp_jwt = JWT(exp_time=settings.OTP_VALIDITY_DURATION)


def current_year():
    return timezone.now().year


class UserManager(BaseUserManager):
    def create_user(self, college_id, email=None, password=None, role=0):
        """
        Creates and saves a User with the given email and password.
        """
        if not college_id:
            raise ValueError('Users must have College id')
        if not email:
            raise ValueError('User must have a email id')
        if role is None:
            raise ValueError('Role is Required')
        user = self.model(
            college_id=college_id,
            email=self.normalize_email(email),
            role=role
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, college_id, email, password, role):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
            role=role
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, college_id, email, password, role):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
            role=role
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# hook in the New Manager to our Model


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICE = (
        (0, 'Student'),
        (1, 'Teacher'),
        (2, 'HOD'),
        (3, 'Dean'),
        (4, 'Vice-Chancellor'),
    )
    college_id = models.CharField(
        verbose_name='Register/Emp Number',
        max_length=10,
        unique=True,
    )
    first_name = models.CharField("First Name", max_length=150, blank=True)
    last_name = models.CharField("Last Name", max_length=150, blank=True)
    email = models.EmailField("Email Address", blank=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    forgot_otp = models.CharField(max_length=4096, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    role = models.PositiveIntegerField(choices=ROLE_CHOICE)

    branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, blank=True, null=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = 'college_id'
    # Email & Password are required by default.
    REQUIRED_FIELDS = ['email', 'role']

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    @property
    def batch(self):
        if self.role == 0 and self.branch is not None:
            return f'{self.branch.batch_start_date} - {self.branch.batch_end_date}'

        return ''

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def clean(self, *args, **kwargs):
        if self.leaving_year is not None and self.leaving_year < self.joining_year:
            raise ValidationError('Leaving Year cannot be before joining year')

    def has_email(self):
        return True

    def new_password(self, password):
        self.set_password(password)
        self.save()
        try:
            mail = Mail('password_changed')
            mail.send_email({
                'recipients': self.email,
                'context': {'name': self.full_name}
            })
            return True
        except:
            return False

    def send_otp(self):
        otp = str(random.randint(1000, 9999))

        token = otp_jwt.generate_jwt_token(make_password(otp))
        self.forgot_otp = token
        self.save()
        try:
            mail = Mail('forgot_password')
            mail.send_email({
                'message': {'otp': otp},
                'recipients': self.email,
                'context': {
                    'otp': otp,
                    'otp_validTime': settings.OTP_VALIDITY_DURATION,
                }
            })
            return True
        except:
            raise Exception
            return False

    def verify_otp(self, otp):
        stored_otp = otp_jwt.decode_jwt_token(self.forgot_otp)
        if stored_otp is not False:
            if check_password(otp, stored_otp):
                return True
        return False

    def has_phone(self):
        return True
