from django.db import models


# Create your models here.
class OxygenData(models.Model):
    record_id = models.IntegerField()
    state_name = models.CharField(max_length=100)
    distributor_name = models.CharField(max_length=100)
    area = models.CharField(max_length=150)
    contact_information = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



