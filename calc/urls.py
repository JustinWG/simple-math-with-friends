from django.urls import path

from .views import CalcPage

urlpatterns = [
    path('', CalcPage.as_view(), name='calc'),
]
