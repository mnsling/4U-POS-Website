# Generated by Django 5.1 on 2024-12-01 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0061_repackproductlog_repackedproduct_displayedstock_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repackedproduct',
            name='displayedStock',
            field=models.IntegerField(blank=True),
        ),
    ]