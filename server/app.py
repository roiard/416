from flask import Flask, request, redirect, jsonify, send_from_directory
from flask_cors import CORS,cross_origin
import pandas as pd
from werkzeug.utils import secure_filename
import os
import numpy as np
from random import randint
from datetime import datetime, timedelta, date
import logging

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
processed_data = [] 
cors = CORS(app)

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
    
@app.route('/upload', methods=['POST'])
def upload_file_web():
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message="No selected file"), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        process_and_store_data(filepath)
        return jsonify({"message": "File uploaded and processed", "data": processed_data}), 200

@app.route('/download-excel', methods=['GET'])
def download_excel():
    # Assuming 'data' is your JSON data
    data = request.get_json()
    department = request.args.get('department')
    year = request.args.get('year')
    semester = request.args.get('semester')

    if not data: 
        return jsonify({"error": "No data provided"}), 400
    # Convert JSON to DataFrame
    df = pd.DataFrame(data)

    # Specify a filename
    filename = f'course_{year}_{semester}_{department}.xlsx'
    
    # Ensure the UPLOAD_FOLDER directory exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
    # Save the DataFrame as an Excel file
    df.to_excel(file_path, index=False)

    # Send the file to the client
    return send_from_directory(directory=app.config['UPLOAD_FOLDER'], path=filename, as_attachment=True)
    
def show_data(path):
    # Read CSV and process data
    df = pd.read_excel(path, sheet_name=0)

    df.fillna(method='ffill', inplace=True)
    df['End Time'] = pd.to_datetime(df['End Time'].astype('string')).dt.strftime('%I:%M %p').str.lstrip('0')
    df['Start Time'] = pd.to_datetime(df['Start Time'].astype('string')).dt.strftime('%I:%M %p').str.lstrip('0')
    global processed_data
    processed_data = df.to_dict(orient='records')

def process_and_store_data(path):
    # Read CSV and process data
    df = pd.read_excel(path, sheet_name=0)

    # remove here after making real web
    df.fillna(method='ffill', inplace=True)
    df['Total time'] = ((pd.to_datetime(df['End Time'].astype('string')) - pd.to_datetime(df['Start Time'].astype('string')))).dt.total_seconds() / 60
   
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

@app.route('/check-and-process', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def check_and_process_file():
    
    department = request.args.get('department')
    year = request.args.get('year')
    semester = request.args.get('semester')

    # Log the incoming request
    logging.info(f"Processing file for {department}, Year: {year}, Semester: {semester}")

    # Construct file path
    filename = f'course_{year}_{semester}_{department}.xlsx'
    filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
    
    # Check if file exists
    if os.path.isfile(filepath):
        try:
            
            show_data(filepath)

            return jsonify({'message': 'File exists and processed', 'data': processed_data})
        except Exception as e:
            logging.error(f"Error processing file: {e}")
            return jsonify({'message': 'Error processing file', 'error': str(e)}), 500
    else:
        return jsonify({
            'message': 'File does not exista',
            'department': department,
            'year': year,
            'semester': semester,
            'filepath': filepath,
            'data': []
        }), 404


@app.route('/courses', methods=['GET'])
def get_data():

    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(debug=True)

