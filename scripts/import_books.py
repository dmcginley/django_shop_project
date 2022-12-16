from shop_app.models import Author, Book, Genre, Image, Publisher
from csv import DictReader
import requests
import os
import shutil
from django.core.files import File


def run():
    """ A script I created to import book date form a CSV file """

    csv_file = open('scripts/bookdata_small.csv')
    reader = DictReader(csv_file)

    for row in reader:
        title = row["title"]
        # authors = row["authors"]
        rating = row["rating"]
        description = row["description"]
        isbn = row["isbn"]
        publisher_name = row["publisher"]
        publication_date = "2022-11-29"  # row["publication_date"]
        pages = row["pages"]
        image_url = row["image"]
        price = row["price"]
        number_in_stock = row["number_in_stock"]
        genre_str = row["genre"]
        genres = []
        for g in genre_str.split(','):
            g = g.strip()
            slug = g.lower().replace(' ', '-').replace("'", '')
            genre_obj, genre_created = Genre.objects.get_or_create(
                name=g, slug=slug)
            genres.append(genre_obj)

        slug = f"{isbn}-{title.replace(' ', '-')}"
        author, author_created = Author.objects.get_or_create(
            first_name=row["author_first_name"],
            last_name=row["author_last_name"])

        publisher, publisher_create = Publisher.objects.get_or_create(
            name=publisher_name
        )

        # https://stackoverflow.com/questions/13137817/how-to-download-image-using-requests

        image_path = f"book_covers/{isbn}.jpg"
        image_response = requests.get(image_url, stream=True)
        out_dir = os.path.join("media", "book_covers_dl")
        out_file = os.path.join(out_dir, f"{isbn}.jpg")
        print("this is the file", out_file)
        with open(out_file, "wb") as f:
            image_response.raw.decode_content = True
            print("writing to ", out_file)
            shutil.copyfileobj(image_response.raw, f)

        book, book_created = Book.objects.get_or_create(
            title=title,
            rating=rating,
            description=description,
            isbn=isbn,
            publisher=publisher,
            publication_date=publication_date,
            pages=pages,
            image=Image.objects.create(),
            price=price,
            number_in_stock=number_in_stock,
        )

        book.image.image.save(f"{isbn}.jpg", File(open(out_file, "rb")))

        book.authors.add(author)
        book.genres.set(genres)
        if book_created:
            author_report = ""
            if author_created:
                author_report = f" (created author {author})"
