from flask import Blueprint, jsonify, abort, request
from controllers.books_controller import BooksController, Book

books_API = Blueprint('books_api', __name__)

@books_API.route('/books', methods = ['GET'])
def getbooks():
    booksContoller = BooksController()
    allBooks = booksContoller.getBooksOrderedById()
    books = booksContoller.paginate(allBooks, request)

    if len(books) <= 0:
        abort(404)

    return jsonify({
        "success": True,
        "books": books,  
        "total_books": len(allBooks)
    })


@books_API.route('/books', methods = ['POST'])
def insert_book():
    try:    
        booksContoller = BooksController()
        body = request.get_json()
        if 'title' not in body or 'author' not in body:
            abort(400)
        book = Book()
        book.author = body.get('author')
        book.title = body.get('title')
        book.rating = int(body.get('rating', 0))
        booksContoller.insert_book(book)
        return jsonify({
            "success": True,
            "inserted": book.id
        })
    except:
        abort(400)


@books_API.route('/books', methods = ['DELETE'])
def delete_book():
    try:    
        booksContoller = BooksController()
        body = request.get_json()
        if 'id' not in body:
            abort(400)
        idToDelete = int(body.get('id'))
        book = booksContoller.getBookById(idToDelete)
        
        if book is None:
            abort(404)
        else:
            booksContoller.delete_book(book)

        return jsonify({
            "success": True,
            "deleted": idToDelete
        })
    except:
        abort(400)




