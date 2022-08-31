from django.db import models

# Create your models here.

class Plato(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200,verbose_name='Nombre')
    precio = models.DecimalField(max_digits=10,decimal_places=2)
    imagen = models.CharField(max_length=200,verbose_name='Imagen')

    class Meta:
        db_table = 'platos'

    def __str__(self):
        return self.nombre