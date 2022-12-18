"""shop_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('shop_app.urls')),
    path('accounts/', include('allauth.urls')),
    path('profile/', include('profiles_app.urls')),
    path('cart/', include('cart_app.urls')),
    path('checkout/', include('checkout_app.urls')),
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt",
                             content_type="text/plain"),
    ),
    path(
        "sitemap.xml",
        TemplateView.as_view(template_name="sitemap.xml",
                             content_type="text/plain"),
    ),
]

handler400 = "shop_app.views.bad_request"
handler403 = "shop_app.views.access_denied"
handler404 = "shop_app.views.page_not_found_view"
handler500 = "shop_app.views.handler500"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
