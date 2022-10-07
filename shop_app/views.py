from django.shortcuts import render

from shop_app.models import Product
from .models import Product
# Create your views here.


def home(request):

    context = {
        'posts': Product.objects.all()
    }
    return render(request, 'shop_app/index.html', context)
