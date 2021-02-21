# from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics

from .serializers import CalculationsSerializer
from .models import Calculations


class CalcPage(TemplateView):
    template_name = 'calc/calc.html'


class CalculationsList(generics.ListCreateAPIView):
    queryset = Calculations.objects.all()
    serializer_class = CalculationsSerializer
