from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def setup_db(app, database_path):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    db.app = app
    db.init_app(app)
    Migrate(app, db)
    return db

from models.books import Book