var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Book = require('./Book.js');

var BookList = React.createClass({
    render: function(){
        return(
            <div className="grid-x grid-margin-x medium-up-3 large-up-4"> 
            {
                this.props.books.map(function(book, i){
                    return(<Book book={book} key={i}/>)
                })
            }
            </div>
        )
    }
});

module.exports = BookList;