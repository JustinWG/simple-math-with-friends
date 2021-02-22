from django.urls import path

from .views import CalcPage, CalculationsNew, CalculationsGet


urlpatterns = [
    path('', CalcPage.as_view(), name='calc'),
    path('api/new', CalculationsNew.as_view(), name='api_new'),
    path('api/get', CalculationsGet.as_view(), name='api_get'),
]
