from django.contrib import admin
from .models import Book, Author, Publisher, Image, Genre


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'last_name']
    list_display = ['first_name', 'last_name']
    list_filter = ['first_name', 'last_name']


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    search_fields = ('title', 'author_names',
                     'genre_name', 'isbn')

    list_display = ['title', 'author_names',
                    'genre_name', 'isbn']

    list_filter = ('title', 'authors', 'genres')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image']


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
