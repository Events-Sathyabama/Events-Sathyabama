# Generated by Django 4.1.7 on 2023-04-18 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0028_rename_messages_event_history_alter_event_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(max_length=500, upload_to='poster/'),
        ),
    ]
