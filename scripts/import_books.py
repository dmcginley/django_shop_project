
from shop_app.models import Author, Book
from csv import DictReader


def run():

    csv_file = open('scripts/books.csv')
    reader = DictReader(csv_file)

    for row in reader:
        title = row["title"]

        rating = row["rating"]
        isbn = row["isbn"]
        description = row["description"]
        genre = row["genre"]
        pages = row["pages"]
        author = row["author"]
        first = row["author_first_name"]
        last = row["author_last_name"]
        slug = f"{isbn}-{title}-{first}-{last}"
        author, author_created = Author.objects.get_or_create(
            first_name=row["author_first_name"], last_name=row["author_last_name"])
        book, book_created = Book.objects.get_or_create(
            title=title,
            series=series,
            rating=rating,
            isbn=isbn,
            genre=genre,
            pages=pages,
            author=author,
            description=description,
            price=10.00,
            publisher_id=1,
            slug=slug
        )
        # book.authors.add(author)
        # if book_created:
        #     author_report = ""
        #     if author_created:
        #         author_report = f" (created author {author})"
        print(f"Created book '{title}'{author_report}")
