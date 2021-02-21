from rest_framework import serializers
from .models import Calculations


class CalculationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculations
        fields = ['expression', 'result']
