from django.shortcuts import render, redirect, reverse
from django.contrib import messages
# from shop_project.settings import STRIPE_PUBLIC_KEY

from .forms import OrderForm

# Create your views here.


def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        messages.error(request, "There's nothing in your bag at the moment")
        return redirect(reverse('home'))

    order_form = OrderForm()
    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
        'stripe_public_key': 'pk_test_51M2fVLF8hlX9CerouFmjsXQpaeqDNRoULsGXtmkr9X1sd4R3Su6Y1rI9wF1eVt1XVDcDlxXmzV2GMSMiToFnFVXa00nZ1aNUsz',
        'client_secret': 'test client secret'
    }

    return render(request, template, context)
