# Generated by Django 4.1.2 on 2022-12-11 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("shop_app", "0004_book_users_wishlist"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="users_wishlist",
        ),
    ]