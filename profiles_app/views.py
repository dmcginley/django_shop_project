from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import UserProfile
from .forms import UserProfileForm

from checkout_app.models import Order
# from shop_app.models import Book


@login_required
def profile(request):
    """
    users profile
    """

    profile = get_object_or_404(UserProfile, user=request.user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully')

        else:
            messages.error(
                request, 'Failed. Please ensure the form is valid.')
    else:
        form = UserProfileForm(instance=profile)
    orders = profile.orders.all()

    template = 'profiles_app/profile.html'
    context = {
        'form': form,
        'orders': orders,
    }

    return render(request, template, context)


@login_required
def order_history(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)

    messages.info(request, (
        f'This is a past confirmation for order number {order_number}. '
        'A confirmation email was sent on the order date.'
    ))

    template = 'profiles_app/order_history.html'
    context = {
        'order': order,
    }

    return render(request, template, context)


# @login_required
# def user_wishlist(request):
#     wishlist = Wishlist.object.filter(user=request.user)

#     template = 'profiles_app/wishlist.html'

#     context = {
#         "wishlist": wishlist
#     }

#     return render(request, template, context)
