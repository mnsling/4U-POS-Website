# Generated by Django 5.1 on 2024-12-03 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0081_rename_onecent_endcashcount_fivecent'),
    ]

    operations = [
        migrations.AddField(
            model_name='endcashcount',
            name='terminalIssued',
            field=models.CharField(choices=[('ONE', 'One'), ('TWO', 'Two'), ('THREE', 'Three')], default='One', max_length=10),
        ),
        migrations.AddField(
            model_name='startcashcount',
            name='terminalIssued',
            field=models.CharField(choices=[('ONE', 'One'), ('TWO', 'Two'), ('THREE', 'Three')], default='One', max_length=10),
        ),
    ]