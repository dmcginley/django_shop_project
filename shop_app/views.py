from django.shortcuts import redirect, render, reverse, get_object_or_404
import secrets
from django.contrib import messages
from email import message
from django.db.models import Q


from django.views.generic import ListView, DetailView

# from shop_app.models import Product
from .models import Book, Author


def home(request):

    books = Book.objects.all()
    query = None

    if request.GET:
        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                message.error(request, "You didn't any search")
                return redirect(reverse('books'))
            querises = Q(title__icontains=query) | Q(
                isbn__icontains=query)
            books = books.filter(querises)

    context = {
        'books': books,
        'search_term': query,

    }
    return render(request, 'shop_app/index.html', context)


class BookListView(ListView):
    model = Book
    template_name = 'book/index.html'

    context_object_name = 'books'
    # ordering = ['-date_posted']  # date posted in reverse order
    paginate_by = 24


class BookDetailView(DetailView):
    model = Book
