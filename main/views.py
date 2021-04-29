from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    """Index Page view"""

    return HttpResponse("<h1>Coming Soon</h1>")