from django.apps import AppConfig


class CheckoutAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "checkout_app"

    def ready(self):
        import checkout_app.signals
