# Generated by Django 4.1.2 on 2022-11-27 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkout_app", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="original_cart",
            field=models.TextField(default=""),
        ),
        migrations.AddField(
            model_name="order",
            name="stripe_pid",
            field=models.CharField(default="", max_length=254),
        ),
    ]
