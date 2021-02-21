from django.urls import path

from .views import CalcPage, CalculationsList

urlpatterns = [
    path('', CalcPage.as_view(), name='calc'),
    path('api/', CalculationsList.as_view(), name='api'),
]
