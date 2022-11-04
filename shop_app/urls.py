from django.urls import path
from . import views
from .views import BookDetailView
# from .views import genre_list

# app_name = 'shop_app'

urlpatterns = [
    path('', views.home, name='home'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    # path('book/<slug:slug>/', views.book_detail, name='book_detail'),
    path('<slug:slug>/', views.genre_list, name='genre_list'),

]
