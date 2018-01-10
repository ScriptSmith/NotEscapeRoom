from flask import *
from flask_sqlalchemy import SQLAlchemy
import random
import string

app = Flask(__name__)
app.config.from_json('config.json')

db = SQLAlchemy(app)


class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    hub = db.Column(db.Integer, db.ForeignKey('hubs.id'))
    clients = db.relationship("Client", backref="clients")
    code = db.Column(db.String)
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
    if request.user_agent.platform in ['android', 'ios']:
        return mobile()
    else:
        return desktop()


@app.route('/end')
def end():
    session.clear()
    return redirect('/')
	
@app.route('/instructions')
def instructions():
    return render_template("instructions.html")

def desktop():
    hub_id = session.get('hub')
    game_id = session.get('game')
    if not hub_id or not game_id:
        hub = create_hub()
        game = create_game(hub)
        db.session.commit()
        session['game'] = game.id
        session['hub'] = hub.id
    else:
        hub = Hub.query.filter_by(id=hub_id).first()
        game = Game.query.filter_by(id=game_id).first()

        if not hub or not game:
            return end()

    return render_template("desktop.html", game=game, hub=hub)


def mobile():
    # do stuff
    return render_template("mobile.html")


def create_hub():
    hub = Hub(key=generate_key(5), progress='.....')
    db.session.add(hub)
    return hub


def create_game(hub):
    game = Game(hub=hub.id, code=generate_join_code(), complete=False)
    db.session.add(game)
    return game


def generate_join_code():
    code = ''.join(random.choices(string.ascii_uppercase, k=5))
    for game in Game.query.all():
        if game.code == code:
            return generate_join_code()
    return code


def generate_key(length):
    return ''.join(random.choices("↖↗↘↙←↓↑→", k=length))


if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
