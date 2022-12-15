from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.views.generic import ListView, DetailView

from .models import Book, Genre
from .forms import BookForm


class BookListView(ListView):
    """ Home page - class based view to list book with pagination """
    page_title = 'Home'
    page_header = 'Newly Added Books'
    paginate_by = 16
    model = Book
    template_name = 'shop_app/index.html'
    extra_context = {
        'page_title': page_title,
        'page_header': page_header,

        'on_home_page': True
    }
    context_object_name = 'books'


def get_random(request):
    random = Book.objects.order_by("?").first()
    books = Book.objects.all()

    context = {
        'books': books,
        'random': random,
    }

    return render(request, 'shop_app/genre.html', context)


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
        'searching': searching.strip(),
        'results': results,
        'result_count': len(results),
    }

    if len(searching.strip()) == 0:
        messages.error(request, "Please enter a search term")
    return render(request,
                  'shop_app/book_search.html', context)


class BookDetailView(DetailView):
    model = Book
# TODO: fix book detail maybe using slug

    def book_detail(request):

        return render(request, 'shop_app/book_detail.html')


class BookOrderView(ListView):
    """ class view to list book by price low to high with pagination """
    page_title = 'Price (Low to High)'
    paginate_by = 16
    model = Book

    ordering = ['price']
    template_name = 'shop_app/index.html'
    extra_context = {
        'page_title': page_title
    }
    context_object_name = 'books'


class BookReverseOrderView(ListView):
    """ class view to list book by price high to low with pagination """
    page_title = 'Price (High to Low)'
    paginate_by = 16
    model = Book

    ordering = ['-price']
    template_name = 'shop_app/index.html'
    extra_context = {
        'page_title': page_title

    }
    context_object_name = 'books'


def genre(request):
    # TODO: should this be render request or just return
    return {
        'genres': Genre.objects.all()
    }


def genre_list(request, genre_slug):

    genres = get_object_or_404(Genre, slug=genre_slug)
    book = Book.objects.filter(genres=genres)

    page_title = genres

    print('genre:', genres)
    page = request.GET.get('page', 1)
    paginator = Paginator(book, 8)

    try:
        books = paginator.page(page)
    except PageNotAnInteger:
        books = paginator.page(1)
    except EmptyPage:
        books = paginator.page(paginator.num_pages)

    context = {
        'books': books,
        'page_title': page_title,
    }

    return render(request, 'shop_app/genre.html', context)


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
