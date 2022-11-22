from django.http import HttpResponse


class StripeWH_Handler:
    """ handles stripe webhooks """

    def __init__(self, request):
        self.request = request

    def handel_event(self, event):
        """ handles unknown/unexpected webhook events """

        return HttpResponse(
            content=f'Undandeled Webhook received: {event["type"]}',
            status=200
        )

    def handel_payment_intent_succeeded(self, event):
        """ handles payment_intent_succeeded webhook from stripe """

        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200
        )

    def handel_payment_intent_failed(self, event):
        """ handles payment_intent_failed webhook from stripe """

        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200
        )
