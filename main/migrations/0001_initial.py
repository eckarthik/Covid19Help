# Generated by Django 3.2 on 2021-05-04 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OxygenData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.IntegerField()),
                ('state_name', models.CharField(max_length=100)),
                ('distributor_name', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=150)),
                ('contact_information', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]