from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, college_id, email=None, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not college_id:
            raise ValueError('Users must have College id')
        if not email:
            raise ValueError('User must have a email id')
        user = self.model(
            college_id=college_id,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, college_id, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, college_id, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
        )
        user.admin = True
        user.save(using=self._db)
        return user

# hook in the New Manager to our Model


class User(AbstractBaseUser):
    college_id = models.CharField(
        verbose_name='Register/Emp Number',
        max_length=10,
        unique=True,
    )
    first_name = models.CharField("First Name", max_length=150, blank=True)
    last_name = models.CharField("Last Name", max_length=150, blank=True)
    email = models.EmailField("Email Address", blank=True)

    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    objects = UserManager()

    # notice the absence of a "Password field", that is built in.

    EMAIL_FIELD = "email"
    USERNAME_FIELD = 'college_id'
    REQUIRED_FIELDS = ['email'] # Email & Password are required by default.

    def get_full_name(self):
        # The user is identified by their email address
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name

    def __str__(self):
        return self.college_id

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

