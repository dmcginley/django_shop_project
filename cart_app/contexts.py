from multiprocessing import context
from statistics import quantiles

from django.conf import settings
from decimal import Decimal
from django.shortcuts import get_object_or_404
from shop_app.models import Book


def cart_contents(request):

    cart_items = []
    total = 0
    book_count = 0
    cart = request.session.get('cart', {})

    for item_id, quantity in cart.items():
        book = get_object_or_404(Book, pk=item_id)
        total += quantity * book.price
        book_count += quantity
        cart_items.append({
            'item_id': item_id,
            'quantity': quantity,
            'book': book,
        })

    if total < settings.FREE_DELIVERY_THRESHOLD:
        delivery = total * Decimal(settings.STANDARD_DELIVERY_PERCENTAGE / 100)
        free_delivery_delta = settings.FREE_DELIVERY_THRESHOLD - total
    else:
        delivery = 0
        free_delivery_delta = 0

    grand_total = delivery + total

    context = {
        'cart_items': cart_items,
        'total': total,
        'book_count': book_count,
        'delivery': delivery,
        'free_delivery_delta': free_delivery_delta,
        'free_delivery_threshold': settings.FREE_DELIVERY_THRESHOLD,
        'grand_total': grand_total,
    }

    return context
