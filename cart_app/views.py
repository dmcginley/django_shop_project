from django.shortcuts import render

# Create your views here.


def view_cart(request):
    """ The view that renders the cart contents page """

    return render(request, 'cart_app/cart.html')
