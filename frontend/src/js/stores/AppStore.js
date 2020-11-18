var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';
var _books = [];
var total_books = 0;
var pageumber = 1;

var AppStore = assign({}, EventEmitter.prototype, {
    addBook: function(book){
        _books.push(book);
    },
    getBooks: function(){
        return _books;
    },
    getBooksTotal: function(){
        return total_books;
    },
    getPageNumber: function(){
        return pageumber;
    },
    setBooks: function(books, pagenumber){
        _books = books.books;
        total_books = books.total_books;
        pageumber = pageumber;
    },
    deleteBook: function(bookid){
        var index = _books.findIndex(i=>i.id === bookid);
        _books.splice(index, 1);
    },
    emitChange: function(){
        this.emitChange(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType){
        case AppConstants.ADD_BOOK:
            console.log('Adding Book...'+action.book.title);

            //Save to Store
            AppStore.addBook(action.book);

            //Save to API
            AppAPI.addBook(action.book);
            
            //Retrieve from API
            AppAPI.getBooks(action.pagenumber);

            AppStore.emit(CHANGE_EVENT);
            break;

        case AppConstants.GET_BOOKS:
            console.log('Receiving Books...');

            //Save to Store
            AppStore.setBooks(action.books, action.pagenumber);

            AppStore.emit(CHANGE_EVENT);
            break;

        case AppConstants.DELETE_BOOK:
            console.log('Removing Book...'+action.bookid);

            //Delete from Store
            AppStore.deleteBook(action.bookid);

            //Delete from API
            AppAPI.deleteBook(action.bookid);

            AppStore.emit(CHANGE_EVENT);
            break;
    }

    return true;
});


module.exports = AppStore;