from django.contrib import admin
from .models import Book, Author, Publisher, Image, Genre

# from django.contrib.admin.views.main import ChangeList
# from .forms import BookChangeListForm

# Register your models here.


# class BookChangeList(ChangeList):
#     def __init__(self, request, model, list_display,
#                  list_display_links, list_filter, date_hierarchy,
#                  search_fields, list_select_related, list_per_page,
#                  list_max_show_all, list_editable, model_admin):
#         super(BookChangeList, self).__init__(request, model,
#                                              list_display, list_display_links, list_filter,
#                                              date_hierarchy, search_fields, list_select_related,
#                                              list_per_page, list_max_show_all, list_editable,
#                                              model_admin)

#     # these need to be defined here, and not in MovieAdmin
#     self.list_display = ['action_checkbox', 'name', 'authors']
#     self.list_display_links = ['name']
#     self.list_editable = ['authors']


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'last_name']
    list_display = ['first_name', 'last_name']
    list_filter = ['first_name', 'last_name']


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    search_fields = ['name', 'website']
    list_display = ['name', 'website']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    # def get_changelist(self, request, **kwargs):
    #     return BookChangeList

    # def get_changelist_form(self, request, **kwargs):
    #     return BookChangeListForm

    search_fields = ('title', 'authors', 'genre',
                     'isbn')
    list_display = ['title', 'author_names', 'genre_name', 'isbn']
    list_filter = ('title', 'authors', 'genre', 'isbn')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image']


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
