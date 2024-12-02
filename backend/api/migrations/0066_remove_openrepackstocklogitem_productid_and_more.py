# Generated by Django 5.1 on 2024-12-01 15:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0065_openrepackstocklogitem_qtyadded'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='openrepackstocklogitem',
            name='productID',
        ),
        migrations.AddField(
            model_name='openrepackstocklogitem',
            name='stockID',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.stock'),
            preserve_default=False,
        ),
    ]