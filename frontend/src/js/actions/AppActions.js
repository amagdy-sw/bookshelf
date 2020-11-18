var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    addBook: function(book){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_BOOK,
            book: book
        });
    },
    receiveBooks: function(books, pagenumber){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_BOOKS,
            books: books,
            pagenumber: pagenumber
        });      
    },
    removeBook: function(bookid){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.DELETE_BOOK,
            bookid: bookid
        });          
    }
}

module.exports = AppActions;