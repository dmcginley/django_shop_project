from tokenize import blank_re
from unicodedata import decimal
from django.db import models
from PIL import Image
from django.forms import model_to_dict
from django.urls import reverse


# class Product (models.Model):
#     title = models.CharField(max_length=100)
#     discription = models.TextField(blank=True, null=True)


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    # email = models.EmailField()

    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)


class Publisher(models.Model):
    #     """A company that publishes books."""
    name = models.CharField(max_length=50,
                            help_text="The name of the Publisher.")
    website = models.URLField(blank=True, help_text="The Publisher's website.")
#     # email = models.EmailField(help_text="The Publisher's email address.")

    def __str__(self):
        return self.name


class Image(models.Model):
    image = models.ImageField(
        default='default.png', upload_to='book_covers')

    # def __str__(self):
    #     return self.image


class Book(models.Model):
    """A published book."""
    title = models.CharField(
        max_length=100, help_text="The title of the book.")
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)

    publication_date = models.DateField(
        verbose_name="Date the book was published.")
    isbn = models.CharField(max_length=20,
                            verbose_name="ISBN number of the book.")
    image = models.ForeignKey(
        Image, blank=True, null=True, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    number_in_stock = models.PositiveIntegerField(blank=True, null=True)

    def author_names(self):
        all = []
        for a in self.authors.all():
            all.append(str(a))
        return "; ".join(all)

    def __str__(self):
        return self.title
