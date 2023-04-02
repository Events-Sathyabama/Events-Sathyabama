# Generated by Django 4.1.7 on 2023-04-02 08:32

from django.db import migrations, models
import event.models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0021_event_accpted_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='accpted_role',
        ),
        migrations.AddField(
            model_name='event',
            name='accpted_role',
            field=models.JSONField(default=event.models.default_accepted_role),
        ),
    ]
