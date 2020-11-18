from models import db, Book
from flask import request

ITEMS_PER_PAGE = 8

class BooksController:
    
    def __init__(self):
        pass

    def paginate(self, selection, request):
        page = request.args.get('page', 1, type=int)
        offset = (page - 1) * ITEMS_PER_PAGE
        end = offset + ITEMS_PER_PAGE
        formatted_selection = [item.format() for item in selection[offset:end]] 
        return formatted_selection

    def insert_book(self, book:Book):
        book.insert()

    def update_book(self, book:Book):
        book.update()

    def delete_book(self, book:Book):
        book.delete()
        
    def getBookById(self, bookid):
        return Book.query.get(bookid)
    
    def getBooksOrderedById(self):
        return Book.query.order_by(Book.id).all()
