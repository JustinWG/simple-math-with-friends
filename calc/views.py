# from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics

from .serializers import CalculationsSerializer
from .models import Calculations


class CalcPage(TemplateView):
    template_name = 'calc/calc.html'


class CalculationsNew(generics.CreateAPIView):
    queryset = Calculations.objects.all()
    serializer_class = CalculationsSerializer


class CalculationsGet(generics.ListAPIView):
    queryset = Calculations.objects.all().order_by('-created_at')[:10]
    serializer_class = CalculationsSerializer
