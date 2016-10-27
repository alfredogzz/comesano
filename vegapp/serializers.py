from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Restaurant, Review


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields= ('id', 'user', 'img_perfil', 'nombre_completo')

class RestaurantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','nombre', 'descripcion', 'location_lat', 'location_lon', 'price', 'veg')

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ('calificacion', 'user', 'restaurant')
