from django.contrib import admin
from .models import Book, Author, Publisher, Image

# Register your models here.


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name']


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ['name', 'website']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    search_fields = ('title', 'authors',
                     'isbn')
    list_display = ['title', 'isbn']
    list_filter = ('title', 'authors', 'isbn')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image']
