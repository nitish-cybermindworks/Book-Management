# Book-Management

- App to maintain details of books.

## Book API's

### POST

-To create book details.
-Author and title must be unique.
-Author must be a user.
-ISBN(International Standard Book Number) for book must be unique.
-Fields (title,author,isbn,publicationYear,category)

### GET

-To get books based on filters such as (title,author,isbn,publicationYear,category)

### PUT

-To update book details
-Only admin can update.
-Requirement: Need to pass all properties of book along with bookId.

### DELETE

-To delete book details.
-Only admin can delete.

## USER API's

### POST

-To create new user.
-Email or phone must be unique.
-Fields(firstName,lastName,email,phone,role,bio,profileImage)
-User can have no book or one book or multiple books

### GET

-To get user details
