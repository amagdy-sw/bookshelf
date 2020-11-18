var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Book = React.createClass({
    render: function(){
        return(
            <div className="cell">
                <div className='book'>
                    <p>
                        {this.props.book.title} <br/>
                        {this.props.book.author} <br/>
                        <span className="rating">Rating : {this.props.book.rating}</span> 
                        <br/>
                        <br/>
                        <a className="delete" onClick={this.removeBook.bind(this, this.props.book.id)}>Remove</a>
                    </p>

                </div>
            </div>
        )
    },
    removeBook: function(i,j){
        AppActions.removeBook(i);
    }
});

module.exports = Book;