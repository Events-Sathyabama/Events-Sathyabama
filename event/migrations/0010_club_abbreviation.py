# Generated by Django 4.1.7 on 2023-03-12 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0009_club'),
    ]

    operations = [
        migrations.AddField(
            model_name='club',
            name='abbreviation',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
