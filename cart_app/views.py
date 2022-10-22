from django.shortcuts import render, redirect
from requests import request

# Create your views here.


def view_cart(request):
    """ The view that renders the cart contents page """

    return render(request, 'cart_app/cart.html')


def add_to_cart(request, item_id):
    """ adds a quantity to cart """

    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    cart = request.session.get('cart', {})

    if item_id in list(cart.keys()):
        cart[item_id] += quantity
    else:
        cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(redirect_url)
