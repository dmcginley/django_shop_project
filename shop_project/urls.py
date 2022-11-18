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


urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),
    # path('cart/', include('view_cart.urls')),
    path('', include('shop_app.urls')),
    path('shop/', include('cart_app.urls')),
    path('checkout/', include('checkout_app.urls')),
    path('profile/', include('profiles_app.urls')),

]


# handler403 = "techblog_app.views.access_denied"
# handler400 = "techblog_app.views.bad_request"
# handler404 = "techblog_app.views.page_not_found_view"
# handler500 = "techblog_app.views.handler500"


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
