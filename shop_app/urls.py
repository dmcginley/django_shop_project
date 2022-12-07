from django.urls import path
from . import views
from .views import BookDetailView


urlpatterns = [
    path('', views.home, name='home'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('add/', views.add_book, name='add_book'),
    path('edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('delete/<int:book_id>/', views.delete_book, name='delete_book'),
    path('search/<slug:genre_slug>/', views.genre_list, name='genre_list'),

]
