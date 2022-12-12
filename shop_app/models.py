from django.db import models
# from django.conf import settings
from django.urls import reverse
# from profiles_app.models import UserProfile


class Author(models.Model):
    """Author with first and last name so you can search by either name"""
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)


class Publisher(models.Model):
    """A company that publishes books."""
    name = models.CharField(max_length=100,
                            help_text="The name of the Publisher.")

    def __str__(self):
        return self.name


class Image(models.Model):
    """
    Takes in the image from the import_book.py
    and adds it to the database.
    """
    image = models.ImageField(default='no_cover.png',
                              upload_to='book_covers/')

    def __str__(self):
        return str(self.image)


class Genre(models.Model):
    """Genre with slug field so that you can search by genre on the website"""
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    def get_absolute_url(self):
        return reverse('shop_app:genre_list', args=[self.slug])

    def __str__(self):
        return self.name


class Book(models.Model):
    """A published book."""
    title = models.CharField(
        max_length=255, help_text="The title of the book.")
    authors = models.ManyToManyField(Author)
    rating = models.DecimalField(
        decimal_places=1, blank=True, max_digits=2,
        help_text="Between 1 and 10")
    description = models.TextField(blank=True)
    isbn = models.CharField(max_length=20,
                            verbose_name="ISBN number of the book.")
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    publication_date = models.DateField(
        verbose_name="Date the book was published.",
        null=True, help_text="e.g. 2022-10-29")

    pages = models.PositiveIntegerField(null=True)
    image = models.ForeignKey(
        Image, blank=True, null=True, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    number_in_stock = models.PositiveIntegerField(blank=True, null=True)
    genres = models.ManyToManyField(
        Genre, related_name='book', help_text="Select a genre for this book")

    def __unicode__(self):
        return self.title

# to combine the authers name for e.g. admin panal
    def author_names(self):
        all = []
        for a in self.authors.all():
            all.append(str(a))
        return "; ".join(all)

    def genre_name(self):
        all = []
        for a in self.genres.all():
            all.append(str(a))
        return "; ".join(all)

    def __str__(self):
        return self.title
