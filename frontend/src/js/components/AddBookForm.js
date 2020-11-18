var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AddBookForm = React.createClass({
    render: function(){
        return(
            <div>
                <h5>Add A Book</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="large-12 columns">
                            <label>
                                Title
                                <input type="text" ref="title" placeholder="Enter Title">
                                </input>
                            </label>
                            <label>
                                Author
                                <input type="text" ref="author" placeholder="Enter Author">
                                </input>
                            </label>  
                            <label>
                                Rating
                                <input type="number" ref="rating" placeholder="Enter Rating">
                                </input>
                            </label>                            
                            <button className="button">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    },
    onSubmit: function(e){
        e.preventDefault();
        var book = {
            title: this.refs.title.value.trim(),
            author: this.refs.author.value.trim(),
            rating: parseInt(this.refs.rating.value.trim())
        }
        AppActions.addBook(book);
    }
});

module.exports = AddBookForm;