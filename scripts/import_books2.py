
from shop_app.models import Author, Book
# from shop_app.models import Book
from csv import DictReader


def run():

    csv_file = open('scripts/bookdata_small.csv')
    reader = DictReader(csv_file)

    for row in reader:
        title = row["title"]
        # authors = row["authors"]
        rating = row["rating"]
        description = row["description"]
        isbn = row["isbn"]
        publisher = row["publisher"]
        publication_date = row["publication_date"]
        pages = row["pages"]
        image = row["image"]
        price = row["price"]
        number_in_stock = row["number_in_stock"]
        genre = row["genre"]

        slug = f"{isbn}-{title}"
        author, author_created = Author.objects.get_or_create(
            first_name=row["author_first_name"], last_name=row["author_last_name"])
        book, book_created = Book.objects.get_or_create(
            title=title,
            authors=author,
            rating=rating,
            description=description,
            isbn=isbn,
            publisher=publisher,
            publication_date=publication_date,
            pages=pages,
            image=image,
            price=price,
            number_in_stock=number_in_stock,
            genre=genre,
            slug=slug
        )

        book.authors.add(author)
        if book_created:
            author_report = ""
            if author_created:
                author_report = f" (created author {author})"
        # print(f"Created book '{title}'{author_report}")
