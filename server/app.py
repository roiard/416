from flask import Flask, request, redirect, jsonify
import pandas as pd
from werkzeug.utils import secure_filename
import os
import numpy as np
from random import randint
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
processed_data = [] 

# remove this part after fetching index.html page
@app.route('/')
def index():
    return '''
    <!doctype html>
    <title>Upload a CSV File</title>
    <h1>CSV file upload</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        process_and_store_data(filepath)
        return "File uploaded and processed. Use /courses to retrieve."

def process_and_store_data(path):
    # Read CSV and process data
    df = pd.read_excel(path, sheet_name=2)

    # remove here after making real web
    df.fillna(method='ffill', inplace=True)
    df['Total time'] = ((pd.to_datetime(df['End Time']) - pd.to_datetime(df['Start Time']))).dt.total_seconds() / 60
    df['Start Time'], df['End Time'] = None, None
    df = df[df['Total time'] >0]
    # remove here after making real web
    start_time = {
    0: '9:00 AM',
    1:'10:30 AM', 
    2: '12:30 PM',
    3: '2:00 PM',
    4: '3:30 PM',
    5: '5:00 PM'
    }

    num = df.shape[0] // 6
    extra = df.shape[0] % 6

    lst = [num for _ in range(6)]

    for _ in range(extra):
        idx = randint(0, num-1)
        lst[idx] += 1

    time_slots = []

    for i in range(6):
        time_slots += [start_time[i]] * lst[i]
                
    np.random.shuffle(time_slots)         
    df['Start Time'] = time_slots

    df['End Time'] = df.apply(calculate_end_time, axis=1)
        
    global processed_data
    processed_data = df.to_dict(orient='records')

def calculate_end_time(row):

    start_time_dt = datetime.strptime(row['Start Time'], '%I:%M %p')
    end_time_dt = start_time_dt + timedelta(minutes=row['Total time'])
    end_time_str = end_time_dt.strftime('%I:%M %p')

    return end_time_str



@app.route('/courses', methods=['GET'])
def get_data():

    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(debug=True)
