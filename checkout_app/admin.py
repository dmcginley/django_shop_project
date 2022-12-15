from django.contrib import admin
from .models import Order, OrderLineItem


# Register your models here.

class OrderLineAdminInLine(admin.TabularInline):
    model = OrderLineItem
    readonly_fields = ('lineitem_total',)


class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderLineAdminInLine,)

    readonly_fields = ('order_number', 'date', 'delivery_cost',
                       'order_total', 'grand_total',
                       'original_cart', 'stripe_pid')

    fields = ('order_number', 'user_profile', 'date',
              'name', 'email', 'phone_number', 'country',
              'postcode', 'town_or_city', 'street_address1',
              'street_address2', 'county', 'delivery_cost',
              'order_total', 'grand_total', 'original_cart',
              'stripe_pid')

    list_display = ('order_number', 'date', 'name',
                    'delivery_cost', 'order_total', 'grand_total')

    ordering = ('-date',)


admin.site.register(Order, OrderAdmin)
