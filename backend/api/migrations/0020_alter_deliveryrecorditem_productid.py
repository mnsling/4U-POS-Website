# Generated by Django 5.1 on 2024-10-28 06:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_rename_qtydelivered_deliveryrecorditem_qty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliveryrecorditem',
            name='productID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
    ]