from django.contrib import admin
from .models import *
# Register your models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'img_perfil')

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('calificacion', 'user', 'restaurant')

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Review, ReviewAdmin)
