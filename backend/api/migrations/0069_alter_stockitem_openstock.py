# Generated by Django 5.1 on 2024-12-02 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0068_alter_openrepackstocklogitem_openedstock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockitem',
            name='openStock',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
