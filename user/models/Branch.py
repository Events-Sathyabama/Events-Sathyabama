from django.db import models


class Branch(models.Model):
    name = models.CharField(max_length=30)
    batch_start_date = models.PositiveIntegerField()
    batch_end_date = models.PositiveIntegerField()

    @property
    def batch(self):
        return f"{self.batch_start_date} - {self.batch_end_date}"

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Branches'
