from django.urls import path
from . import views
from .views import (
    BookDetailView, BookListView,
    BookOrderView, BookReverseOrderView

)

urlpatterns = [
    path('', BookListView.as_view(), name='home'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('search/<slug:genre_slug>/', views.genre_list, name='genre_list'),

    path('book_order_view/', BookOrderView.as_view(), name='book_order'),
    path('book_revers_order/', BookReverseOrderView.as_view(),
         name='book_revers_order'),
    path('book_search/', views.book_search, name='book_search'),

    path('add/', views.add_book, name='add_book'),
    path('edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('delete/<int:book_id>/', views.delete_book, name='delete_book'),


    # path('book_order_view/', views.book_order_view, name='book_order_view'),
    # path('genres/', GenreListView.as_view(), name='genres'),
    # path('book_search/', BookSearchView.as_view(), name='book_search'),
]
