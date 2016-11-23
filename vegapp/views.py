from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from .models import UserProfile, Restaurant, Review
from rest_framework import viewsets, generics
from django.middleware import csrf
from django.conf import settings
from django.db.models import Avg
from vegapp.serializers import *


class RestaurantList(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantReviewCount(viewsets.ModelViewSet):
    serializer_class = ReviewCountSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['id']
        count_rem = []
        inner_count = {}
        inner_count['count'] = Review.objects.filter(restaurant=restaurant_id).count()
        count_rem.append(inner_count)
        return count_rem

class RestaurantReviewAverage(viewsets.ModelViewSet):
    serializer_class = ReviewAvgSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['id']
        count_rem = []
        inner_count = Review.objects.filter(restaurant=restaurant_id).aggregate(Avg('calificacion'))
        count_rem.append(inner_count)
        return count_rem

class ReviewList(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


class RestaurantReviewList(viewsets.ModelViewSet):
    serializer_class = RestaurantReviewSerializer
    def get_queryset(self):
        restaurant_id = self.kwargs['id']
        return Review.objects.filter(restaurant=restaurant_id)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class UserProfileList(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserDetail(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.kwargs['username']
        return User.objects.filter(username=user)

class UserProfileDetail(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        user_id = self.kwargs['id']
        return UserProfile.objects.filter(user=user_id)

def home(req):
    csrf_token = csrf.get_token(req)
    context_dict = {'STATIC_URL': settings.STATIC_URL, 'token': csrf_token}

    return render(req, 'vegapp/main.html', context_dict)
