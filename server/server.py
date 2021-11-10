import os
import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
@cross_origin()
def create_audio():

    return_val = {
        'msg': "Hello World",
    }

    return jsonify(return_val)

if __name__ == "__main__":
    app.run(debug=True)