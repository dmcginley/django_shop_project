from unicodedata import category
from django.shortcuts import redirect, render, reverse, get_object_or_404
import secrets
from django.contrib import messages
# from email import message
from django.db.models import Q


from django.views.generic import ListView, DetailView

# from shop_app.models import Product
from .models import Book, Author, Genre
# from .models import Book, Author


def home(request):

    books = Book.objects.all()
    authors = Author.objects.all()

    query = None
    sort = None
    direction = None
    # TODO: Queries and Categories, one of two ways
    # genre = None

    if request.GET:
        if 'sort' in request.GET:
            sortkey = request.GET['sort']
            sort = sortkey
            if sortkey == 'title':
                sortkey = 'lower_title'
                books = books.annotate(lower_title=Lower('title'))

            if 'direction' in request.GET:
                direction = request.GET['direction']
                if direction == 'desc':
                    sortkey = f'-{sortkey}'
            books = books.order_by(sortkey)

        if 'genre' in request.GET:
            genres = request.GET['genre'].split(',')
            books = books.filter(genre__name__in=genres)
            genres = Genre.objects.filter(genre__name__in=genres)

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
                # print("Q2", q2)

            # TODO: find how Django does many-to-many search
            #  add matching books with found authors to list 'books'
    else:
        print("can't find author>> ")

    current_sorting = f'{sort}_{direction}'

    context = {
        'books': books,
        'search_term': query,
        # 'current_genres': genre,
        'current_sorting': current_sorting
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


def genres(request):

    return {
        'genres': Genre.objects.all()
    }


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
