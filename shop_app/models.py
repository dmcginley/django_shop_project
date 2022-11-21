from email.policy import default
from enum import unique
from tokenize import blank_re
from unicodedata import decimal
from django.db import models
from PIL import Image
from django.forms import model_to_dict
from django.urls import reverse


class Author(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)

    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)


class Publisher(models.Model):
    """A company that publishes books."""
    name = models.CharField(max_length=100,
                            help_text="The name of the Publisher.")
    # website = models.URLField(blank=True, help_text="The Publisher's website.")

    def __str__(self):
        return self.name


class Image(models.Model):
    image = models.ImageField(default='default.png',
                              upload_to='book_covers/')

    # def __str__(self):
    #     return self.image


class Genre(models.Model):
    name = models.CharField(
        max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    def get_absolute_url(self):
        return reverse('shop_app:genre_list', args=[self.slug])

    def __str__(self):
        return self.name


# -----------------------------------------------------------------


class Book(models.Model):
    """A published book."""
    title = models.CharField(
        max_length=255, help_text="The title of the book.")
    authors = models.ManyToManyField(Author)
    rating = models.BigIntegerField(blank=True)
    description = models.TextField(blank=True)
    isbn = models.CharField(max_length=20,
                            verbose_name="ISBN number of the book.")
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    publication_date = models.DateField(
        verbose_name="Date the book was published.", null=True)
    pages = models.IntegerField()
    image = models.ForeignKey(
        Image, blank=True, null=True, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    number_in_stock = models.PositiveIntegerField(blank=True, null=True)
    genre = models.ManyToManyField(
        Genre, related_name='book', help_text="Select a genre for this book")
    slug = models.SlugField(max_length=255, unique=True)

    def __unicode__(self):
        return self.title

    # TODO: BUG: ValueError: Model shop_app.Book can't have more than one auto-generated field.
    # in_stock = models.BigAutoField(default=True)
    # created = models.DateTimeField(auto_now=True)

    # class Meta:
    #     ordering = ('-created',)

    # def get_absolute_url(self):
    #     return reverse('shop_app:genre_list', args=[self.slug])
# -----------------------------------------------------------------

# class Book(models.Model):
#     """A published book."""
#     title = models.CharField(
#         max_length=255, help_text="The title of the book.")
#     series = models.CharField(
#         max_length=255, help_text="The series of the book.")
#     authors = models.ManyToManyField(Author)
#     rating = models.BigIntegerField()
#     description = models.TextField(blank=True)
#     isbn = models.CharField(max_length=20,
#                             verbose_name="ISBN number of the book.")
#     genre = models.ManyToManyField(
#         Genre, related_name='book', help_text="Select a genre for this book")
#     pages = models.IntegerField()
#     publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
#     publication_date = models.DateField(
#         verbose_name="Date the book was published.", null=True)
#     image = models.ForeignKey(
#         Image, blank=True, null=True, on_delete=models.CASCADE)
#     slug = models.SlugField(max_length=255, unique=True)
#     price = models.DecimalField(max_digits=4, decimal_places=2)
#     number_in_stock = models.PositiveIntegerField(blank=True, null=True)

    # TODO: BUG: ValueError: Model shop_app.Book can't have more than one auto-generated field.
    # in_stock = models.BigAutoField(default=True)
    # created = models.DateTimeField(auto_now=True)

    # class Meta:
    #     ordering = ('-created',)

    # def get_absolute_url(self):
    #     return reverse('shop_app:genre_list', args=[self.slug])
# -----------------------------------------------------------------

# to combine the authers name for e.g. admin panal

    def author_names(self):
        all = []
        for a in self.authors.all():
            all.append(str(a))
        return "; ".join(all)

    def genre_name(self):
        all = []
        for a in self.genre.all():
            all.append(str(a))
        return "; ".join(all)

    def __str__(self):
        return self.title
