# Generated by Django 5.1 on 2024-08-27 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_product_created_alter_product_modified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('MISC', 'Miscellaneous'), ('STATIONERY', 'Stationery and Office Supplies'), ('SMOKING', 'Tobacco & Smoking Accessories'), ('HOUSE', 'Household Items'), ('HEALTH', 'Health & Beauty'), ('FROZEN', 'Frozen Foods'), ('REFRIDGERATED', 'Dairy & Refridgerated Items'), ('GROCERY', 'Grocery Items'), ('SNACKS', 'Snacks'), ('BEVERAGES', 'Beverages')], max_length=100),
        ),
    ]
