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
    clients = db.relationship("Client", backref="clients")
    code = db.Column(db.String)
    complete = db.Column(db.Boolean)

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
    return render_template("mobile/instructions.html")


@app.route('/scan')
def scan():
    return render_template("mobile/scan.html")


def desktop():
    game_id = session.get('game')
    if not game_id:
        game = create_game()
        db.session.commit()
        session['game'] = game.id
    else:
        game = Game.query.filter_by(id=game_id).first()

        if not game:
            return end()

    return render_template("desktop.html", game=game)


def mobile():
    return render_template("mobile.html")


def create_game():
    game = Game(code=generate_join_code(), complete=False,
                key=generate_key(5), progress='.....')
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

@app.route('/get_progress')
def progress():
	# get the current key progress
    game_id = request.args.get('game')
    if game_id and game_id != 'NaN':
        game = Game.query.filter_by(code=game_id).first()
        if game:
    	    return game.progress
    return jsonify(False)
	
@app.route('/add_photon')
def add_to_game():
    game_id = request.args.get('game')
    photon = request.args.get('photon')

    if game_id and game_id != 'NaN':
        game = Game.query.filter_by(code=game_id).first()
        if game:
            for i, char in enumerate(game.progress):
                if char == photon:
                    game.key[i] = photon
                    return jsonify(True)
    return jsonify(False)


@app.route('/scan')
def instascan():
    return render_template("instascan.html")


if __name__ == '__main__':
    # create_tables()
    app.run(debug=True, host='0.0.0.0')
