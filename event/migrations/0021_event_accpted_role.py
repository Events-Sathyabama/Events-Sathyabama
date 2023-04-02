# Generated by Django 4.1.7 on 2023-04-02 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0020_alter_event_accepted_participant'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='accpted_role',
            field=models.ManyToManyField(blank=True, choices=[(0, 'Student'), (1, 'Teacher'), (2, 'HOD'), (3, 'Dean'), (4, 'Vice-Chancellor')], to='event.event'),
        ),
    ]
