from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
import os

# Create your models here.
def get_image_path(instance, filename):
    return os.path.join('user', str(instance.id), filename)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE);
    img_perfil = models.ImageField(upload_to=get_image_path, blank=True, null=True)
    nombre_completo = models.CharField(max_length=100)

class Restaurant(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=200)
    location_lat = models.DecimalField(max_digits=10, decimal_places=7)
    location_lon = models.DecimalField(max_digits=10, decimal_places=7)

class Review(models.Model):
    calificacion = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
