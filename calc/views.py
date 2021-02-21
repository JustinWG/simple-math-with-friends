# from django.shortcuts import render
from django.views.generic import TemplateView


class CalcPage(TemplateView):
    template_name = 'calc/index.html'
