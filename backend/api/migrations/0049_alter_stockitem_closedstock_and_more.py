# Generated by Django 5.1 on 2024-11-14 01:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0048_alter_stock_productid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockitem',
            name='closedStock',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='damagedStock',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='displayedStock',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='openStock',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='productID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='stockID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.stock'),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='stockOutDescription',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='stockedOutQty',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='toDisplayStock',
            field=models.IntegerField(null=True),
        ),
    ]
