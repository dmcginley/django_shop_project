from django.urls import path
from . import views
from .views import BookDetailView, BookListView


urlpatterns = [
    # path('', views.home, name='home'),
    path('', BookListView.as_view(), name='home'),
    # path('search/', views.book_list, name='book_list'),

    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('add/', views.add_book, name='add_book'),
    path('edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('delete/<int:book_id>/', views.delete_book, name='delete_book'),
    path('search/<slug:genre_slug>/', views.genre_list, name='genre_list'),
    path('book_search/', views.book_search, name='book_search'),
    path('book_order_view/', views.book_order_view, name='book_order_view'),



    # path('book_search/', BookSearchView.as_view(), name='book_search'),

]
