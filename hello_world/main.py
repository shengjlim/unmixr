# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import Flask
from flask import request
from flask import send_file
from flask_cors import CORS
from yt2wav import getWav
import test
import os
import shutil   # deleting directory

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def main():

    # Remove old files
    if os.path.isdir('tmp_umxhq'):
        shutil.rmtree('tmp_umxhq')

    # Change these variables for different model configuration
    targets = ['vocals']
    filename = 'tmp_umxhq/tmp_accompaniment.wav'
    start = 0
    duration = 30

    url = request.args.get('url', default = "", type = str)
    if url == "":
        return "Missing url param"

    option = request.args.get('option', default = "", type= str)
    if option == "vocals":
        filename = 'tmp_umxhq/tmp_vocals.wav'
    elif option == "drums":
        targets = ['drums']

    # Get Wav file from given URL and put it into temp folder
    getWav(url, "tmp")
    # Run the trained model on the file
    test.unmix('tmp/tmp.wav', targets=targets, start=start)
    os.remove('tmp/tmp.wav')

    # Return wav file
    return send_file(
        filename,
        mimetype='audio/wav',
        as_attachment=True,
        attachment_filename="ret.wav"
        )


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='0.0.0.0')
# [END gae_python37_app]
