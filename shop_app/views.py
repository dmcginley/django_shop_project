from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Lower
# from django.core.paginator import Paginator
from django.db.models import Q
import django_filters
from django.db.models import Value as V
from django.db.models.functions import Concat


from django.views.generic import ListView, DetailView

from .models import Book, Author, Genre
from .forms import BookForm


# from django.db.models import Q

# def home(request):

#     books = Book.objects.all()
#     authors = Author.objects.all()

#     query = None
#     sort = None
#     direction = None
#     # TODO: Queries and Categories, one of two ways

#     if request.GET:
#         if 'sort' in request.GET:
#             sortkey = request.GET['sort']
#             sort = sortkey
#             if sortkey == 'title':
#                 sortkey = 'lower_title'
#                 # TODO: error lower not defined
#                 books = books.annotate(lower_title=Lower('title'))

#             if 'direction' in request.GET:
#                 direction = request.GET['direction']
#                 if direction == 'desc':
#                     sortkey = f'-{sortkey}'
#             books = books.order_by(sortkey)

#         if 'genre' in request.GET:
#             genre = request.GET['genre'].split(',')
#             books = books.filter(genre__name__in=genre)
#             genre = Genre.objects.filter(genre__name__in=genre)

#         if 'q' in request.GET:
#             query = request.GET['q']
#             if not query:
#                 messages.error(request, "Hi, you didn't enter a search")
#                 return redirect(reverse('home'))
#             queries = Q(title__icontains=query) | Q(
#                 isbn__icontains=query)
#             books = books.filter(queries)

#             q2 = Q(first_name__icontains=query) | Q(last_name__icontains=query)
#             authors = authors.filter(q2)
#             # books = books.filter(q2)

#             print(q2)

#             # queries = Q(title__icontains=query) | Q(authors__first_name=query)
#             # # books = books.filter(queries)
#             # print('queries=', queries)

#             # for a in authors:
#             #     print("found author>> ", str(a))

#             # a = Author.objects.get(queries)
#             # b = a.book_set.all()
#             # print(b)
#             # print("Q2", q2)

#             # TODO: find how Django does many-to-many search
#             #  add matching books with found authors to list 'books'
#     else:
#         print("can't find author>> ")

#     current_sorting = f'{sort}_{direction}'

#     context = {
#         # 'books': Book.objects.all(),
#         'books': books,
#         'search_term': query,
#         # 'current_genres': genre,
#         'current_sorting': current_sorting
#     }

#     return render(request, 'shop_app/index.html', context)

##############################################################

class BookListView(ListView):
    """ class view to list book with pagination """
    paginate_by = 16
    model = Book

    template_name = 'shop_app/index.html'
    context_object_name = 'books'


def book_search(request):
    """ GET method search view for authors names, isbn, and title """
    searching = request.GET.get('searching')

    unique_book_isbns = []
    results = []

    def add_new_books(book_list):
        for book in book_list:
            if book.isbn not in unique_book_isbns:
                results.append(book)
                unique_book_isbns.append(book.isbn)

    title_results = []
    if len(searching) > 1:
        title_results = Book.objects.filter(title__icontains=searching)
    add_new_books(title_results)

    isbn_results = []
    if len(searching) >= 9:
        # isbn 10 and isbn 13, must have at least 9 numbers
        isbn_results = Book.objects.filter(isbn__icontains=searching)
    add_new_books(isbn_results)

    for term in searching.split():
        matching_authors = []
        if len(term) > 1:
            matching_authors = Book.objects.filter(Q(
                authors__first_name__icontains=term) |
                Q(authors__last_name__icontains=term))
        print(f"for {term} added {len(matching_authors)} books")
        add_new_books(matching_authors)
        print(f"total books {len(results)}")

    context = {
        'searching': searching,
        'results': results,
        'result_count': len(results)
    }

    if len(searching.strip()) == 0:
        messages.error(request, "Please enter a search term")
    return render(request,
                  'shop_app/book_search.html', context)

# TODO: fix order by price


def book_order_view(request):
    books = Book.objects.all().order_by('price').values()
    authors = Author.objects.all()

    context = {
        'books': books,
        'authors': authors
    }
    return render(request,
                  'shop_app/index.html', context)

##############################################################

# --------------------------------------------------


# def book_list(request):
#     books = Book.objects.all()
#     authors = Author.objects.all()

#     query = None
#     sort = None
#     direction = None
#     # TODO: Queries and Categories, one of two ways

#     if request.GET:
#         if 'sort' in request.GET:
#             sortkey = request.GET['sort']
#             sort = sortkey
#             if sortkey == 'title':
#                 sortkey = 'lower_title'
#                 # TODO: error lower not defined
#                 books = books.annotate(lower_title=Lower('title'))

#             if 'direction' in request.GET:
#                 direction = request.GET['direction']
#                 if direction == 'desc':
#                     sortkey = f'-{sortkey}'
#             books = books.order_by(sortkey)

#         if 'genre' in request.GET:
#             genre = request.GET['genre'].split(',')
#             books = books.filter(genre__name__in=genre)
#             genre = Genre.objects.filter(genre__name__in=genre)

#         if 'q' in request.GET:
#             query = request.GET['q']
#             if not query:
#                 messages.error(request, "Hi, you didn't enter a search")
#                 return redirect(reverse('home'))
#             queries = Q(title__icontains=query) | Q(
#                 isbn__icontains=query)
#             books = books.filter(queries)

#             q2 = Q(first_name__icontains=query) | Q(
#                 last_name__icontains=query)
#             authors = authors.filter(q2)
#             # books = books.filter(q2)

#             print(q2)

#     else:
#         print("can't find author>> ")

#     current_sorting = f'{sort}_{direction}'

#     context = {
#         # 'books': Book.objects.all(),
#         'books': books,
#         'search_term': query,
#         # 'current_genres': genre,
#         'current_sorting': current_sorting
#     }

#     return render(request, 'shop_app/index.html', context)


#     context_object_name = 'books'
    # ordering = ['-date_posted']  # date posted in reverse order

##############################################################
class BookDetailView(DetailView):
    model = Book
# TODO: fix book detail maybe using slug

    def book_detail(request):
        #     book = get_object_or_404(Book, slug=slug,)

        return render(request, 'shop_app/book_detail.html')


def genre_list(request, genre_slug):

    genres = get_object_or_404(Genre, slug=genre_slug)
    book = Book.objects.filter(genres=genres)

    context = {
        'genre': genre,
        'book': book,
    }

    return render(request, 'shop_app/genre.html', context)


def genre(request):
    # TODO: should this be render request or just return
    return {
        'genres': Genre.objects.all()
    }

##############################################################


@ login_required
def add_book(request):
    """ Add a product to the store """
    if not request.user.is_superuser:
        messages.error(request, 'Sorry, only store owners can do that.')
        return redirect(reverse('home'))

    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            book = form.save()
            messages.success(request, 'Successfully added book!')
            return redirect(reverse('book_detail', args=[book.id]))
        else:
            messages.error(
                request,
                'Failed to add book. Please ensure the form is valid.')
    else:
        form = BookForm()

    template = 'shop_app/add_book.html'
    context = {
        'form': form,
    }

    return render(request, template, context)


@ login_required
def edit_book(request, book_id):
    """ Edit a book in the store """
    if not request.user.is_superuser:
        messages.error(request, 'Sorry, only store owners can do that.')
        return redirect(reverse('home'))

    book = get_object_or_404(Book, pk=book_id)
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, instance=book.image)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successfully updated book')
            return redirect(reverse('book_detail', args=[book.id]))
        else:
            messages.error(
                request,
                'Failed to update book. Please ensure the form is valid.')
    else:
        form = BookForm(instance=book)
        messages.info(request, f'You are editing {book.title}')

    template = 'shop_app/edit_book.html'
    context = {
        'form': form,
        'book': book,
    }

    return render(request, template, context)


@ login_required
def delete_book(request, book_id):
    """ Delete a book from the store """
    if not request.user.is_superuser:
        messages.error(request, 'Sorry, only store owners can do that.')
        return redirect(reverse('home'))

    book = get_object_or_404(Book, pk=book_id)
    book.delete()
    messages.success(request, 'Book deleted!')
    return redirect(reverse('home'))


# ------------------------------
#   error views: 400, 403, 404, & 500
# ------------------------------
def bad_request(request, *args, **argv):
    return render(request, 'shop_app/error400.html', status=400)


def access_denied(request,  *args, **argv):
    return render(request, 'shop_app/error403.html', status=403)


def page_not_found_view(request, *args, **argv):
    return render(request, 'shop_app/error404.html', status=404)


def handler500(request,  *args, **argv):
    return render(request, 'shop_app/error500.html', status=500)
