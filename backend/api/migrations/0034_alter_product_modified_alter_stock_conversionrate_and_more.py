# Generated by Django 5.1 on 2024-11-12 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_rename_trackingnumber_deliveryrecord_referencenumber_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='modified',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='stock',
            name='conversionRate',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='stock',
            name='modified',
            field=models.DateField(auto_now_add=True),
        ),
    ]