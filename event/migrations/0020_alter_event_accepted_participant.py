# Generated by Django 4.1.7 on 2023-04-02 07:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event', '0019_rename_participant_event_accepted_participant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='accepted_participant',
            field=models.ManyToManyField(blank=True, related_name='accepted_participant', to=settings.AUTH_USER_MODEL),
        ),
    ]
