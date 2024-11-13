# Generated by Django 5.1 on 2024-08-24 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('barcodeNo', models.CharField(max_length=100, unique=True)),
                ('category', models.CharField(choices=[('MISC', 'Miscellaneous'), ('STAIONERY', 'Stationery and Office Supplies'), ('SMOKING', 'Tobacco & Smoking Accessories'), ('HOUSE', 'Household Items'), ('HEALTH', 'Health & Beauty'), ('FROZEN', 'Frozen Foods'), ('REFRIDGERATED', 'Dairy & Refridgerated Items'), ('GROCERY', 'Grocery Items'), ('SNACKS', 'Snacks'), ('BEVERAGES', 'Beverages')], max_length=100)),
                ('currentStock', models.IntegerField()),
                ('unitPrice', models.FloatField()),
                ('wsmq', models.IntegerField()),
                ('wsp', models.FloatField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]