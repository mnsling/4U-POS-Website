# Generated by Django 5.1 on 2024-11-28 06:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0059_repackedproduct_unitweight'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stock',
            old_name='productID',
            new_name='productId',
        ),
    ]