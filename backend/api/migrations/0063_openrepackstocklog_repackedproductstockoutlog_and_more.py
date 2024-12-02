# Generated by Django 5.1 on 2024-12-01 15:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0062_alter_repackedproduct_displayedstock'),
    ]

    operations = [
        migrations.CreateModel(
            name='OpenRepackStockLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateCreated', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('VALIDATING', 'Validating'), ('CONFIRMED', 'Confirmed')], default='VALIDATING', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='RepackedProductStockOutLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateCreated', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('VALIDATING', 'Validating'), ('CONFIRMED', 'Confirmed')], default='VALIDATING', max_length=20)),
            ],
        ),
        migrations.RenameField(
            model_name='repackproductlogitem',
            old_name='boxesOpened',
            new_name='repackQty',
        ),
        migrations.RemoveField(
            model_name='repackproductlogitem',
            name='qtyAdded',
        ),
        migrations.AlterField(
            model_name='repackproductlogitem',
            name='damagedQty',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='repackproductlogitem',
            name='previousQty',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.CreateModel(
            name='OpenRepackStockLogItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referenceNumber', models.CharField(blank=True, max_length=25, null=True)),
                ('openedStock', models.DecimalField(decimal_places=2, max_digits=10)),
                ('damagedQty', models.DecimalField(decimal_places=2, max_digits=10)),
                ('logID', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.openstocklog')),
                ('productID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.repackedproduct')),
                ('stockItemID', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.stockitem')),
            ],
        ),
        migrations.CreateModel(
            name='RepackedProductStockOutLogItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referenceNumber', models.CharField(blank=True, max_length=25, null=True)),
                ('previousQty', models.IntegerField()),
                ('stockOutQty', models.IntegerField()),
                ('stockOutDescription', models.TextField(null=True)),
                ('logID', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.stockoutlog')),
                ('productID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.repackedproduct')),
                ('stockItemID', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.stockitem')),
            ],
        ),
    ]
