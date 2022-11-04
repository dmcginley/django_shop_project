from audioop import reverse
from django.http import HttpResponse
from django.shortcuts import render, redirect, reverse
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


def adjust_cart(request, item_id):
    """ adjust items in the cart """

    quantity = int(request.POST.get('quantity'))
    cart = request.session.get('cart', {})

    if quantity > 0:
        cart[item_id] = quantity
    else:
        cart.pop[item_id]

    request.session['cart'] = cart

    return redirect(reverse('view_cart'))


def remove_from_cart(request, item_id):
    """ remove items from the cart """

    try:
        cart = request.session.get('cart', {})

        cart.pop(item_id)
        request.session['cart'] = cart
        return HttpResponse(status=200)

    except Exception as e:
        return HttpResponse(status=500)
