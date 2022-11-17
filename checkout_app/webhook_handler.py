from django.http import HttpResponse


class StripeWH_Handler:
    """ handels stripe webhooks """

    def __init__(self, request):
        self.request = request

    def handel_event(self, event):
        """ handeles unknown/unexpected webhook events """

        return HttpResponse(
            content=f'Undandeled Webhook received: {event["type"]}',
            status=200
        )

    def handel_payment_intent_succeeded(self, event):
        """ handeles payment_intent_succeeded webhook from stripe """

        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200
        )

    def handel_payment_intent_failed(self, event):
        """ handeles payment_intent_failed webhook from stripe """

        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200
        )
