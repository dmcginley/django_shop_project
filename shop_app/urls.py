from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='shop_app-home'),

]
