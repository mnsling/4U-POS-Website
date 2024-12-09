# Generated by Django 5.1 on 2024-12-02 19:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0074_alter_repackedproductstockoutlogitem_logid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transactionitem',
            name='productID',
        ),
        migrations.AddField(
            model_name='transactionitem',
            name='barcodeNo',
            field=models.CharField(default='', max_length=25),
        ),
        migrations.CreateModel(
            name='Returns',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('returnDate', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('VALIDATING', 'Validating'), ('CONFIRMED', 'Confirmed')], default='VALIDATING', max_length=20)),
                ('refundAmount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transactionID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.transaction')),
            ],
        ),
        migrations.CreateModel(
            name='ReturnItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('itemQty', models.IntegerField()),
                ('transactionItemID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.transactionitem')),
                ('returnID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.returns')),
            ],
        ),
    ]