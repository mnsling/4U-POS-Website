# Generated by Django 5.1 on 2024-11-12 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_alter_product_modified_alter_stock_conversionrate_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='modified',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='conversionRate',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='modified',
        ),
    ]