from django.contrib import admin
from .models import *
# Register your models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'img_perfil')

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('calificacion', 'user', 'restaurant')

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'password', 'is_staff', 'is_superuser' ,'last_login')

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Review, ReviewAdmin)
