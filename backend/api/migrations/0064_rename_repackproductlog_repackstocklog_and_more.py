# Generated by Django 5.1 on 2024-12-01 15:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0063_openrepackstocklog_repackedproductstockoutlog_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='RepackProductLog',
            new_name='RepackStockLog',
        ),
        migrations.RenameModel(
            old_name='RepackProductLogItem',
            new_name='RepackStockLogItem',
        ),
    ]
