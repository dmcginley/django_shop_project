from django.apps import AppConfig


class CheckoutAppConfig(AppConfig):
    name = "checkout_app"

    def ready(self):
        import checkout_app.signals
