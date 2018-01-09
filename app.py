from flask import *
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.config.from_json('config.json')

db = SQLAlchemy(app)


class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    hub = db.Column(db.Integer, db.ForeignKey('hubs.id'))
    clients = db.relationship("Client", backref="clients")
    complete = db.Column(db.Boolean)


class Hub(db.Model):
    __tablename__ = "hubs"
    id = db.Column(db.Integer, primary_key=True)

    # Ex: '↖↗↘↙'
    key = db.Column(db.String)
    # Ex: '↖..↙'
    progress = db.Column(db.String)


class Client(db.Model):
    __tablename__ = "clients"
    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.Integer, db.ForeignKey('games.id'))
    score = db.Column(db.Integer)


def create_tables():
    db.drop_all()
    db.create_all()
    db.session.commit()


@app.route('/')
def root():
    return render_template("index.html")


def generate_key(length):
    return ''.join(random.choices("↖↗↘↙←↓↑→", k=length))


@app.route('/create_game')
def create_game():
    hub = Hub(key=generate_key(6), progress='......')
    db.session.add(hub)
    game = Game(hub=hub.id, complete=False)

    db.session.add(game)
    db.session.commit()

    response = {
        'game': game.id,
        'hub': hub.id,
        'key': hub.key
    }

    return jsonify(response)


@app.route('/join_game')
def join_game():
    game_id = request.args.get('game')
    game = Game.query.filter_by(id=game_id).first()

    response = {
        'message': 'failed',
    }

    if game:
        client = Client(game=game_id, score=0)
        db.session.add(client)
        response['client'] = client.id
        response['message'] = 'succeeded'

    return jsonify(response)


if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
