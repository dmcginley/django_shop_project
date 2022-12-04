from unicodedata import category
from django.shortcuts import redirect, render, reverse, get_object_or_404
import secrets
from django.http import HttpResponse
from django.contrib import messages

from django.contrib.auth.decorators import login_required
from django.db.models.functions import Lower

# from email import message
from django.db.models import Q


from django.views.generic import ListView, DetailView
from django.views import generic

# from shop_app.models import Product
from .models import Book, Author, Genre
from .forms import BookForm

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
            for a in authors:
                print("found author>> ", str(a))
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
    template_name = 'books/index.html'

    context_object_name = 'books'
    # ordering = ['-date_posted']  # date posted in reverse order
    paginate_by = 4


class BookDetailView(DetailView):
    model = Book
# TODO: fix book detail maybe using slug
# def book_detail(request, slug):
#     book = get_object_or_404(Book, slug=slug,)

#     return render(request, 'shop_app/book_detail.html')


def genre_list(request, slug):

    genre = get_object_or_404(Genre, slug=slug)
    book = Book.objects.filter(genre=genre)

    context = {
        'genre': genre,
        'book': book,
    }

    return render(request, 'shop_app/genre.html', context)


def genre(request):

    return {
        'genre': Genre.objects.all()
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
            return redirect(reverse('BookDetailView', args=[book.id]))
        else:
            messages.error(
                request, 'Failed to add book. Please ensure the form is valid.')
            return HttpResponse(status=500)

    else:
        form = BookForm()

    template = 'shop_app/add_book.html'
    context = {
        'form': form,
    }

    return render(request, template, context)


# @login_required
# def edit_product(request, product_id):
#     """ Edit a product in the store """
#     if not request.user.is_superuser:
#         messages.error(request, 'Sorry, only store owners can do that.')
#         return redirect(reverse('home'))

#     product = get_object_or_404(Product, pk=product_id)
#     if request.method == 'POST':
#         form = ProductForm(request.POST, request.FILES, instance=product)
#         if form.is_valid():
#             form.save()
#             messages.success(request, 'Successfully updated product!')
#             return redirect(reverse('product_detail', args=[product.id]))
#         else:
#             messages.error(
#                 request, 'Failed to update product. Please ensure the form is valid.')
#     else:
#         form = ProductForm(instance=product)
#         messages.info(request, f'You are editing {product.name}')

#     template = 'products/edit_product.html'
#     context = {
#         'form': form,
#         'product': product,
#     }

#     return render(request, template, context)


# @login_required
# def delete_product(request, product_id):
#     """ Delete a product from the store """
#     if not request.user.is_superuser:
#         messages.error(request, 'Sorry, only store owners can do that.')
#         return redirect(reverse('home'))

#     product = get_object_or_404(Product, pk=product_id)
#     product.delete()
#     messages.success(request, 'Product deleted!')
#     return redirect(reverse('products'))


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
