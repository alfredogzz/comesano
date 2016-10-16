from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from .models import UserProfile, Restaurant, Review
from rest_framework import viewsets, generics
from vegapp.serializers import UserSerializer, UserProfileSerializer, RestaurantSerializer, ReviewSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class UserProfileList(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class RestaurantList(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class ReviewList(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
