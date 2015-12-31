from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting

def uber_data(request):
	return render(request, 'landing.html')

