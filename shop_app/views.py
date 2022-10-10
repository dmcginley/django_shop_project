from django.shortcuts import render


from django.views.generic import ListView, DetailView

# from shop_app.models import Product
from .models import Book, Author


def home(request):

    context = {
        'books': Book.objects.all()
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
