from .forms import UserAdminCreationForm, UserAdminChangeForm
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.forms import AdminPasswordChangeForm

from . import models
from django.utils.translation import gettext_lazy as _

admin.site.register(models.Branch)
#
#
# from django.contrib import admin
# from django.contrib.auth.models import Group
#
#
User = get_user_model()
#
# # Remove Group Model from admin. We're not using it.
# admin.site.unregister(Group)
#
#


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    fieldsets = (
        (None, {"fields": ("college_id", "password")}),
        (_("Personal info"), {"fields": ("first_name",
         "last_name", "email", 'role', 'branch')}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("college_id", "password1", "password2"),
            },
        ),
    )
    list_display = ("college_id", "email", "first_name", "last_name", "role")
    list_filter = ("is_staff", "is_superuser", "is_active", "role")
    search_fields = ("college_id", "first_name", "last_name", "email", "role")
    ordering = ("college_id",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
