from flask import *
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


@app.route('/')
def root():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
