from unicodedata import category
from django.shortcuts import redirect, render, reverse, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Lower

from django.db.models import Q
from django.views.generic import ListView, DetailView

from .models import Book, Author, Genre
from .forms import BookForm


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
                # TODO: error lower not defined
                books = books.annotate(lower_title=Lower('title'))

            if 'direction' in request.GET:
                direction = request.GET['direction']
                if direction == 'desc':
                    sortkey = f'-{sortkey}'
            books = books.order_by(sortkey)

        if 'genre' in request.GET:
            genre = request.GET['genre'].split(',')
            books = books.filter(genre__name__in=genre)
            genre = Genre.objects.filter(genre__name__in=genre)

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
            # books = books.filter(q2)

            print(q2)

            # queries = Q(title__icontains=query) | Q(authors__first_name=query)
            # # books = books.filter(queries)
            # print('queries=', queries)

            # for a in authors:
            #     print("found author>> ", str(a))

            # a = Author.objects.get(queries)
            # b = a.book_set.all()
            # print(b)
            # print("Q2", q2)

            # TODO: find how Django does many-to-many search
            #  add matching books with found authors to list 'books'
    else:
        print("can't find author>> ")

    current_sorting = f'{sort}_{direction}'

    context = {
        # 'books': Book.objects.all(),
        'books': books,
        'search_term': query,
        # 'current_genres': genre,
        'current_sorting': current_sorting
    }

    return render(request, 'shop_app/index.html', context)


class BookListView(ListView):
    model = Book
    # template_name = 'books/index.html'

    context_object_name = 'books'
    # ordering = ['-date_posted']  # date posted in reverse order
    paginate_by = 4


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


@login_required
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
                request, 'Failed to add book. Please ensure the form is valid.')

    else:
        form = BookForm()

    template = 'shop_app/add_book.html'
    context = {
        'form': form,
    }

    return render(request, template, context)


@login_required
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
                request, 'Failed to update book. Please ensure the form is valid.')
    else:
        form = BookForm(instance=book)
        messages.info(request, f'You are editing {book.title}')

    template = 'shop_app/edit_book.html'
    context = {
        'form': form,
        'book': book,
    }

    return render(request, template, context)


@login_required
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
