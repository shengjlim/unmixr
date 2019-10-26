FROM gcr.io/google-appengine/python

# Python 3
RUN venv /env -p python3.7

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
