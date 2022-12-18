# Project 5 - BookShop

## Table of contents

## The Links

[Link to site](https://web-production-7efa.up.railway.app/)
[Link to github project](https://github.com/dmcginley/shop_project)
[Facebook page](https://www.facebook.com/profile.php?id=100088574147985)

## About the Project

An online e-commerce book Shop featuring so of the most well-known book.
In the store, you can go from searching for a book to reading a description about it to checking out in one flowing movement through.

It has a simple to understand clean design while being based on the standard for e-commerce book sites out there e.g. Amazon or Book Depository.

## Who is this website for

People searching for books who like a hassle-free experience while shopping.
People who would rely on searching books by title or author, not just by ISBN.

- <mark>Present a clear rationale for the development of the project, addressing the user stories</mark>

## E-commerce

<mark>The requirements for an e-commerce business model:
The necessity for the inclusion of an e-commerce business model, highlighting the purpose of the application as either B2B or B2C focused, and detailing the core business intents and marketing strategies for the application.</mark>

- <mark>document the business model underlying the site</mark>

## Wireframe

Created in Figma

- <mark>Document the UX design</mark>

###### _link to file:_ [https://www.figma.com/file/j25NLKtS...](https://www.figma.com/file/j25NLKtS1bbWLyaCnHOa8U/Untitled?node-id=0%3A1)

![Sign-in and register page](readme_images/mockup_1.png)

![Main/home page](readme_images/mockup_2.png)

![Shopping cart](readme_images/mockup_3.png)

## Agile development - kanban board

![middle of the project](readme_images/kanban_1.png)

![near the end of the project](readme_images/kanban_2.png)

## Epic

Create an E-commerce Book shop that can have multiple users either signed in or not. They can search for books and add them to the cart easily and fluidly that allows for quick shopping.

## User Stories

#### Admin

- "As an admin, I want to be able to edit or delete a book from the main page or detailed page so it takes as little time as possible."

  Acceptance criteria:

  1. Given that I'm an admin when I click on the edit button below the book I get taken to a page where I can edit details on the book.
  2. Given that I'm an admin when I click on the delete button below the book gets deleted from the shop.

- Add a book to the database via the Profile dropdown in the navbar

- "As an admin I want to be able to add a book to the shop."

  Acceptance criteria:

  1. Given that I'm an admin when I navigate to the profile dropdown I can see the link for add a book, when I click the link it takes me to the page where I can then add the book.

#### User

- "As a user, I want to be able to view each book in detail so I can see more information about the book."

  Acceptance criteria:

  1.  Given that I'm a user when I click on a book from the main page I am taken to the detail page of that book with further information and a description of that book.

- "As a user I want to be able to search by genre of books so I can search by my favorite genre and types."

  Acceptance criteria:

  1. Given that I'm a user when I navigate to the navagation bar and click on the genres dropdown, I can see a list of genres to select from when I click on one of the links I am then taken to that genre page.

- "As a user, I'd like to only have a few books per page so I don't have to be constantly scrolling through a large list of books.

  Acceptance criteria:

  1.  Given that I'm a user when I scroll to the bottom of the page I see a set of page numbers that I can easily navigate through pages or from the very first page to the very last.

#### Customer

- "As a customer, I want to be able to see feedback messages so I can see if I have placed an order successfully or not, or preformed a task correctly."

  Acceptance criteria:

  1. Given that I'm a customer when I add a book to my cart a message shows up in the corner with the cart detail showing that I have added the book to my cart.

  2. Given that I'm a customer when updating my number of books from
     the cart page a success message shows up in the top right-hand corner.
     Acceptance criteria:

- "As a customer I like to be able to add or delete the quantity of books for my cart in case I change my mind midway through purchasing items."

  Acceptance criteria:

  1. Given that I'm a customer when I navigate to the cart, under the price of the book I can either increase or reduce the quality of books in my cart.
  2. Given that I'm a customer when I navigate to the cart, I can remove books complety from my cart.

#### Registered customer

- "As a registered customer, I want to be able to edit my profile address so I don't have to be typing it in each time I purchase an item."

  Acceptance criteria:

  1. Given that I'm a registered customer when I navagate to my profile page I see a form where I can fill out my address details.

- "As a registered customer I want to be able to view my order history so that I can remember which books I purchased from the shop and at what prices."

  Acceptance criteria:

  1.  Given that I'm a registered user when I navigate to my profile page I can see a list of my orders, when I click on one of the order numbers, it then takes me to the order summary page where can see details about that order.

---

#### As a Customer

- Ability to Register, Sign in and Sign out
- Profile Page

  - Change and update address details
  - Order History, click on a past order and view the orders (similer to the confermation page but with the book desplayed to the side as thumbnales)

- Books on the home page and Genre page are shown in reverse order so the last added will be at the top of the page, using in the Book model

  ```
  ordering = ('-date_added',)
  ```

- Searching
  - Search by Author, Title or ISBN in the search bar
  - Search by Genre via the dropdown
  - Search by Price (ascending or descending) via the dropdown
- Add a book to the cart directly from the home page
- Click on a book cover to view the book detail page, with a description and a larger cover image
- Add a book to the cart from the book detail page, and increase or decrease the quantity from that page
- Free delivery over €40 calculated by the backend
- Pagination, so if there were to be a larger selection of books there wouldn't be just one big list of books on one page
- When searching each search or book being viewed shows up in the title on the tab so you can clearly see what part of the site you are on if you click away from the website
- Cart popup, each time you add a book to the cart it shows you a short summary of your cart contents with a button allowing you to go directly to the cart
- Shopping Cart

  - In the cart you can change the quantity of items or remove the book compltey from the cart
  - Shows you a summary of total, delivery, and total price with a continue shopping button in case you forgot somthing, and checkout button below that

- Checkout
  - Can bring in your current address details from the profile page and can save the details in the checkout to the profile page
  - View an order summary with thumbnails of the books to be purchased and the order total price

## Technologies Used

- [Visual Studio Code](https://code.visualstudio.com/) IDE I used for Bootstrap, JavaScript, & Django
- [Amazon Web Services (AWS)](https://aws.amazon.com/) - for hosting the static files
- [Railway](https://railway.app/) for deploying the site

- [GitHub](https://github.com/) - the version control
- [SQLite](https://www.sqlite.org/index.html) - database used in development
- [PostgreSQL](https://www.postgresql.org/) - database for production

### The Code

- [Bulma](https://bulma.io/) - CSS framework that
- [jQuery](https://jquery.com/)
- [Django 4.1.2](https://www.djangoproject.com/)
- [Python3](https://www.python.org/)

### Main libraries & applications used

- [django-allauth](https://django-allauth.readthedocs.io/en/latest/overview.html)
- [django-crispy-forms](https://django-crispy-forms.readthedocs.io/en/latest/)
- [crispy-bulma](https://github.com/ckrybus/crispy-bulma)
- [django-countries](https://pypi.org/project/django-countries/)

## Features

1. Create an account & change profile address and view past orders.
2. Search by Genre, Author (either name), or ISBN
3. Add a book to the cart from the homepage
4. Click on a book cover to be taken to the detail page of the book
5. increase or reduce the quality of course you wish to cover
6. purchase from the book detail page
7. view a description of the book Home Depot detail page along with
8. view a short summary of the books to be purchased on the checkout page
9. Pagination on the home page, genre page and book by price page
10. purchase books with a credit card or debit card using stripe

## Site Layout

###### The general look and feel of the blog

<<< TODO images of the site >>>

## Accessibility

- Clean minimal design with the use of white space and small use of strong colors for text and links so it is clear to see where to go and what to do as some book sites can be over cluttered
- Contrasting colors e.g. a lighter buttons on the dark background with white text color on the Hero section of the home page
- alternative text on images, buttons, and < a > tags, where appropriate.
  The navagation bar and all elements on the pages are tab friendly, mostly through the use of Bulma.

## Testing

### Validator Testing

- **lighthouse**

### Manual Testing

### User tests

**Login**

- Go to the Sign In page
- Enter your username or email, & your password
- Press the Sign In button after which you will be redirected to the home page, with a success message showing in the top right corner telling you you have successfuly signed in.

**Create an account**

- Go to the register page
- Enter required details e.g. email, email again, username, password, and password again, and press the button "create your account"
- You'll be redirected to the login page so that you'+ll be able to login to your new account

**Add an item to cart**

## Error Handling

## Troubleshooting

**webhook_handler** error, couldn't locate the issue with:

- missing "clientSecret"
- forgot fields in models
- missing code in strip_elements.js

```
var postData = {
        ...
        'client_secret': clientSecret,
        ...
    };
```

## Deployment

From Visual Studio Code termnal

```
$ export RAILWAY_DEPLOYMENT=True
$ python manage.py collectstatic
$ python manage.py makemigrations
$ python manage.py migrate
```

#### prerequisite for deployment

#### Deploying

## Version Control

The version control is done using Git through [GitHub](https://github.com/).

### How To Clone The Project

1. From the repository, https://github.com/.... navigate to **Code** button, and in the dropdown menu select the URL: (https://github.com/.....git).

2. Open a Terminal on your computer.

3. Type git clone, and then paste the URL you copied earlier.

4. Press Enter to create your local clone.

## Resources

**General reading and resources.**

- [How to Write Good Commit Messages: A Practical Git Guide](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/)

#### Bootstrap

#### Django

- [Django documentation](https://docs.djangoproject.com/en/4.0/)

#### Python

- [Real Python](https://realpython.com/)

## Credits

**Sites content, media, and help with implementing code from tutorials & online help.**

#### CSS, Images & Icons

- [Boxicons](https://boxicons.com/?query=search)
- [Css gradient](https://cssgradient.io/)- used for gradient on the search icon
- [How To Shorten Text With CSS (ellipsis)](https://www.youtube.com/watch?v=lurEwLtdWMI)
- []()

#### Bulma

- [Bulma - Column sizes](https://bulma.io/documentation/columns/sizes/)
- [BUG FIX: columns.is-variable overflow #1540](https://github.com/jgthms/bulma/issues/1540)
- [Build a Django Front End With Bulma – Part 2](https://realpython.com/django-social-front-end-2/)

#### Django & Python

- [Layouts, Fundamentals of crispy-forms](https://django-crispy-forms.readthedocs.io/en/latest/layouts.html)
- [stack**overflow**](https://stackoverflow.com/questions/61609953/is-there-a-way-to-hide-a-button-on-every-page-except-home-page-of-a-site-in-djan) - hiding button on every page except Home page in Django
- []()
- []()
- []()

- [Chapter 10: Advanced Models](https://django-book.readthedocs.io/en/latest/chapter10.html) - help for creating the book model and related models

#### PostgreSQL _- database_

- []()
- []()
- []()
