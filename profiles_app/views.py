from django.shortcuts import render

# Create your views here.


def profile(request):
    """
    users profile
    """
    template = 'profiles/profile.html'
    context = {}

    return render(request, template, context)
