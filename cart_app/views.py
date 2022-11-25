# from audioop import reverse
from django.http import HttpResponse
from django.shortcuts import render, redirect, reverse, get_object_or_404
from requests import request
from django.contrib import messages
from shop_app.models import Book


def view_cart(request):
    """ The view that renders the cart contents page """

    return render(request, 'cart_app/cart.html')


def add_to_cart(request, item_id):
    """ adds a quantity of an item to the cart """

    book = get_object_or_404(Book, pk=item_id)
    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    cart = request.session.get('cart', {})

    if item_id in list(cart.keys()):
        cart[item_id] += quantity
        # messages.cart(
        #     request, f'Added {book.title} to your cart')
        messages.success(
            request, f'Added {book.title} to your cart')

    else:
        cart[item_id] = quantity
        messages.success(request, f'Added {book.title} to your cart')

    request.session['cart'] = cart
    return redirect(redirect_url)


def adjust_cart(request, item_id):
    """ adjust items in the cart """

    book = get_object_or_404(Book, pk=item_id)
    quantity = int(request.POST.get('quantity'))
    cart = request.session.get('cart', {})

    if quantity > 0:
        cart[item_id] = quantity
        messages.success(
            request, f'Updated {book.title} quantity in your cart')

    else:
        cart.pop[item_id]
        messages.success(request, f'Removed {book.title} from your cart')

    request.session['cart'] = cart

    return redirect(reverse('view_cart'))


def remove_from_cart(request, item_id):
    """ remove items from the cart """

    try:
        book = get_object_or_404(Book, pk=item_id)
        cart = request.session.get('cart', {})

        cart.pop(item_id)
        messages.success(request, f'Removed {book.title} from cart')

        request.session['cart'] = cart
        return HttpResponse(status=200)

    except Exception as e:
        messages.error(request, f'Error removing item: {e}')
        return HttpResponse(status=500)
