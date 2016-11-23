from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Restaurant, Review


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','url', 'username', 'email', 'password', 'is_superuser')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields= ('id', 'user', 'img_perfil', 'nombre_completo')

class RestaurantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','nombre', 'descripcion', 'location_lat', 'location_lon', 'price', 'veg')

class ReviewAvgSerializer(serializers.Serializer):
    calificacion__avg = serializers.FloatField()

class ReviewCountSerializer(serializers.Serializer):
    count = serializers.IntegerField()

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ('id','comentario','calificacion', 'user', 'restaurant')

class RestaurantReviewSerializer(serializers.HyperlinkedModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = ('id','comentario','calificacion', 'user_name', 'restaurant')
