from django.db import models

# Create your models here.


class Product (models.Model):
    title = models.CharField(max_length=100)
    discription = models.TextField(blank=True, null=True)
