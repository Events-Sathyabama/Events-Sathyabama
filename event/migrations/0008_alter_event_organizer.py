# Generated by Django 4.1.7 on 2023-03-12 10:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event', '0007_alter_event_organizer_alter_event_short_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='organizer',
            field=models.ManyToManyField(blank=True, limit_choices_to={'role__in': [0, 1, 2]}, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
