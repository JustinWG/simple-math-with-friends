from django.db import models


class Calculations(models.Model):
    expression = models.CharField(max_length=50)
    result = models.FloatField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.expression} = {self.result}"
