"""veg URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework import routers, generics

from vegapp import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'usersprofiles',views.UserProfileList)
router.register(r'restaurants',views.RestaurantList)
router.register(r'reviews',views.ReviewList)
router.register(r'usersByUsername/(?P<username>[a-z0-9-]+)', views.UserDetail, base_name="usersByUsername")
router.register(r'userProfileByUserId/(?P<id>[a-z0-9-]+)', views.UserProfileDetail, base_name="userProfileByUserId")
router.register(r'RestaurantReviewAvg/(?P<id>[a-z0-9-]+)', views.RestaurantReviewAverage, base_name="RestaurantReviewAvg")
router.register(r'RestaurantReviewCount/(?P<id>[a-z0-9-]+)', views.RestaurantReviewCount, base_name="RestaurantReviewCount")
router.register(r'RestaurantReviews/(?P<id>[a-z0-9-]+)', views.RestaurantReviewList, base_name="RestaurantReviewList")
router.register(r'UserReviews/(?P<id>[a-z0-9-]+)', views.UserReviewList, base_name="UserReviewList")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('vegapp.urls')),
    url(r'^auth/', include('djoser.urls.authtoken')),
]
