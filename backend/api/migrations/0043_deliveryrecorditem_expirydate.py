# Generated by Django 5.1 on 2024-11-12 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_remove_deliveryrecord_dateordered'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliveryrecorditem',
            name='expiryDate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
