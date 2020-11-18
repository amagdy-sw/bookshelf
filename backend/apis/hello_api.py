from flask import Blueprint

hello_API = Blueprint('hello_api', __name__)

@hello_API.route('/')
def greeting():
    return 'Welcome to Python Flask'