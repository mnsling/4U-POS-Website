# Generated by Django 5.1 on 2024-11-12 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_alter_deliveryrecord_deliveryfee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockitem',
            name='expiryDate',
            field=models.DateField(null=True),
        ),
    ]
