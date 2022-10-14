from django.urls import path
from . import views
from .views import BookDetailView

urlpatterns = [
    path('', views.home, name='shop_app-home'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
]
