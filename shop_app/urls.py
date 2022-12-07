from django.urls import path
from . import views
from .views import BookDetailView
# from .views import genre_list


urlpatterns = [
    path('', views.home, name='home'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('add/', views.add_book, name='add_book'),
    # path('book/<slug:slug>/', views.book_detail, name='book_detail'),
    path('search/<slug:genre_slug>/', views.genre_list, name='genre_list'),

]
