var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
const appAPI = require('../utils/appAPI');
var AddBookForm = require('./AddBookForm.js');
const BookList = require('./BookList.js');
var NoteList = require('./BookList.js');

function getAppState(){
    return {
        books: AppStore.getBooks(),
        total_books: AppStore.getBooksTotal(),
        page: AppStore.getPageNumber()
    }
}

var App = React.createClass({
    getInitialState: function(){
        return getAppState()
    },
    componentDidMount: function(){
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        AppStore.removeChangeListener(this._onChange);
    },
    selectPage: function(num) {
        this.setState({page: num}, () => this.getBooks());
    },
    getBooks: function(){
        appAPI.getBooks(this.state.page);
    },
    createPagination: function(){
        let pageNumbers = [];
        let maxPage = Math.ceil(this.state.total_books / 8)
        for (let i = 1; i <= maxPage; i++) {
          pageNumbers.push(
            <span
              key={i}
              className={`page-num ${i === this.state.page ? 'active' : ''}`}
              onClick={() => {this.selectPage(i)}}>{i}
            </span>)
        }
        return pageNumbers;
    }
    ,
    render: function(){
        return(
            <div>
                <div className="off-canvas-wrapper">
                    <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
                        <div className="off-canvas position-left reveal-for-large" id="offCanvas" data-off-canvas data-position="left">
                            <div className="row column">
                                <br/>
                                <AddBookForm/>
                            </div>
                        </div>
                        <div className="off-canvas-content" data-off-canvas-content>
                            <BookList books={this.state.books}/>
                            <div className="pagination-menu">
                                {this.createPagination()}
                            </div>                                  
                        </div>                  
                    </div>
                </div>
            </div>
        )
    },
    _onChange: function(){
        this.setState(getAppState());
    }
});

module.exports = App;