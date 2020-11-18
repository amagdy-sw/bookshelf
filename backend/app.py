from flask import Flask, Blueprint, jsonify, abort, request
from flask_cors import CORS
from models import setup_db

def create_app(test_config=None):
    app = Flask(__name__)
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    db = setup_db(app, 'postgres://postgres:abc123@localhost:5432/bookshelf')
    CORS(app)

    @app.errorhandler(404)
    def resource_not_found(e):
        return jsonify({
            "success": False, 
            "error": 404,
            "message": "resource is not found"
         }), 404

    @app.errorhandler(400)
    def unprocessable(e):
        return jsonify({
            "success": False, 
            "error": 400,
            "message": "resource is unprocessable"
         }), 400

    @app.errorhandler(500)
    def unprocessable(e):
        return jsonify({
            "success": False, 
            "error": 500,
            "message": "server error"
         }), 500

    ##welcome api
    from apis import hello_api
    app.register_blueprint(hello_api.hello_API)

    ##books api
    from apis import books_api
    app.register_blueprint(books_api.books_API)

    if __name__ == "__main__":
        app.run()

    return app
        

