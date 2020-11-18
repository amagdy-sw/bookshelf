var AppActions = require('../actions/AppActions');
const AppConstants = require('../constants/AppConstants');

module.exports = {
	addBook: function(book){
		$.ajax({
			url: "http://127.0.0.1:5000/books",
			data: JSON.stringify(book),
			type: "POST",
			async: false,
			contentType: "application/json"
		});
	},
	getBooks: function(pagenumber){
		$.ajax({
			url:"http://127.0.0.1:5000/books?page="+pagenumber,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(data){
				AppActions.receiveBooks(data, pagenumber);
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		});
	},
	deleteBook: function(bookid){
		$.ajax({
			url:"http://127.0.0.1:5000/books",
			type: "DELETE",
			contentType: "application/json",
			dataType: 'json',
			cache: false,
			async: false,
			data: JSON.stringify({id:bookid})
		});		
	}
}