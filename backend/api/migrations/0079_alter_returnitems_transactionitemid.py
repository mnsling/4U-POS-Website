# Generated by Django 5.1 on 2024-12-03 02:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0078_returnitems_amountrefundable_returnitems_itemprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='returnitems',
            name='transactionItemID',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.transactionitem'),
        ),
    ]
