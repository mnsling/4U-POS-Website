# Generated by Django 5.1 on 2024-10-08 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_stockrecord_supplier_stockrecorditem_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='cellphoneNumber',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='telephoneNumber',
            field=models.CharField(max_length=100),
        ),
    ]
