from unicodedata import category
from django.shortcuts import redirect, render, reverse, get_object_or_404
import secrets
from django.contrib import messages
# from email import message
from django.db.models import Q


from django.views.generic import ListView, DetailView

# from shop_app.models import Product
from .models import Book, Author, Genre


def home(request):

    books = Book.objects.all()
    authors = Author.objects.all()
    query = None
    # TODO: Queries and Categories, one of two ways
    # genre = None

    if request.GET:
        # if 'genre' in request.GET:
        #     genres = request.GET['genre'].split(',')
        #     books = books.filter(genre__name__in=genres)
        #     genres = Genre.objects.filter(genre__name__in=genres)

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "Hi, you didn't enter a search")
                return redirect(reverse('home'))
            queries = Q(title__icontains=query) | Q(
                isbn__icontains=query)
            books = books.filter(queries)

            q2 = Q(first_name__icontains=query) | Q(last_name__icontains=query)
            authors = authors.filter(q2)
            for a in authors:
                print("found author>> ", str(a))
            # TODO: find how Django does many-to-many search
            #  add matching books with found authors to list 'books'

    context = {
        'books': books,
        'search_term': query,
        # 'current_genres': genre,
    }

    return render(request, 'shop_app/index.html', context)


class BookListView(ListView):
    model = Book
    template_name = 'books/index.html'

    context_object_name = 'books'
    # ordering = ['-date_posted']  # date posted in reverse order
    paginate_by = 2


class BookDetailView(DetailView):
    model = Book
# TODO: fix book detail maybe using slug
# def book_detail(request, slug):
#     book = get_object_or_404(Book, slug=slug,)

#     return render(request, 'shop_app/book_detail.html')


def genre_list(request, slug):
    genres = get_object_or_404(Genre, slug=slug)
    book = Book.objects.filter(genre=genres)

    context = {
        'genre': genres,
        'book': book,
    }

    return render(request, 'shop_app/genre.html', context)
