# Generated by Django 5.1.4 on 2025-01-10 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server_side', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
