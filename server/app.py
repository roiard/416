from flask import Flask, request, redirect, jsonify, send_from_directory
from flask_cors import CORS,cross_origin
import pandas as pd
from werkzeug.utils import secure_filename
import os
import numpy as np
from random import randint, choice
from datetime import datetime, timedelta, date
import logging
import json
import re

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
processed_data = []

cors = CORS(app, supports_credentials=True)

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
        
        if os.path.exists(filepath):
            file.save(filepath)
            show_data(filepath)
            return jsonify({"message": "File already exists. Showing data.", "data": processed_data}), 200
        else:
            file.save(filepath)
            process_and_store_data(filepath)
            return jsonify({"message": "File uploaded and processed", "data": processed_data}), 200


@app.route('/download-excel', methods=['POST'])
def download_excel():
    # Assuming 'data' is your JSON data
    data = request.get_json()

    if not data: 
        return jsonify({"error": "No data provided"}), 400

    department = request.args.get('department')
    year = request.args.get('year')
    semester = request.args.get('semester')

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

@app.route('/download-excel-all', methods=['POST'])
def download_excel_all():
    year = request.args.get('year')
    semester = request.args.get('semester')

    if not year or not semester:
        return jsonify({"error": "Year and semester are required"}), 400

    # Read all course_{year}_{semester}_*.xlsx files
    files = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.startswith(f'course_{year}_{semester}_') and f.endswith('.xlsx')]
    
    if not files:
        return jsonify({"error": "No files found for the specified year and semester"}), 404

    # Specify the combined filename
    combined_filename = f'course_{year}_{semester}.xlsx'
    combined_filepath = os.path.join(app.config['UPLOAD_FOLDER'], combined_filename)

    # Create a Pandas Excel writer using XlsxWriter as the engine
    with pd.ExcelWriter(combined_filepath, engine='xlsxwriter') as writer:
        for file in files:
            # Extract the department name from the filename
            department = file.split('_')[-1].replace('.xlsx', '')
            # Read the DataFrame
            df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], file))
            # Write each DataFrame to a different sheet
            df.to_excel(writer, sheet_name=department, index=False)

    # Send the combined file to the client
    return send_from_directory(directory=app.config['UPLOAD_FOLDER'], path=combined_filename, as_attachment=True)

# @app.route('/download-excel', methods=['POST'])
# def download_excel():
#     year = request.args.get('year')
#     semester = request.args.get('semester')
    
#     if not year or not semester:
#         return jsonify({"error": "Year and semester are required"}), 400

#     department_list = ['AMS', 'BM', 'CSE', 'ECE', 'TSM', 'MEC', 'FSC']
#     filename = f'course_{year}_{semester}.xlsx'
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

#     # Ensure the UPLOAD_FOLDER directory exists
#     if not os.path.exists(app.config['UPLOAD_FOLDER']):
#         os.makedirs(app.config['UPLOAD_FOLDER'])

#     with pd.ExcelWriter(file_path, engine='xlsxwriter') as writer:
#         for department in department_list:
#             dept_filename = f'course_{year}_{semester}_{department}.xlsx'
#             dept_filepath = os.path.join(app.config['UPLOAD_FOLDER'], dept_filename)
#             if os.path.exists(dept_filepath):
#                 df = pd.read_excel(dept_filepath)
#                 df.to_excel(writer, sheet_name=department, index=False)
#             else:
#                 return jsonify({"error": f"File for {department} not found"}), 404
    
#     # Send the file to the client
#     return send_from_directory(directory=app.config['UPLOAD_FOLDER'], path=filename, as_attachment=True)

def show_data(path):
    # Read CSV and process data
    df = pd.read_excel(path, sheet_name=0)

    df.fillna(method='ffill', inplace=True)
    df['SBC'] = df['SBC'].fillna(' ')
    df['End Time'] = pd.to_datetime(df['End Time'].astype('string')).dt.strftime('%I:%M %p').str.lstrip('0')
    df['Start Time'] = pd.to_datetime(df['Start Time'].astype('string')).dt.strftime('%I:%M %p').str.lstrip('0')
    global processed_data
    processed_data = json.loads(json.dumps(df.to_dict(orient='records')))

# 충돌 검사를 위한 함수
def check_conflicts(class_set, df_list):
    conflict_dict = {}
    for _, row in class_set.iterrows():
        origin = row['class origin']
        conflict = row['class conflict']
        for df in df_list:
            df['Course Combined'] = df['Subj'] + df['CRS'].astype(str)

            if origin in df['Course Combined'].values and conflict in df['Course Combined'].values:
                origin_row = df[df['Course Combined'] == origin]
                conflict_row = df[df['Course Combined'] == conflict]
                if not origin_row.empty and not conflict_row.empty:
                    if (origin_row['Start Time'].values[0] == conflict_row['Start Time'].values[0] and 
                        origin_row['Days'].values[0] == conflict_row['Days'].values[0]):
                        if origin not in conflict_dict:
                            conflict_dict[origin] = []
                        conflict_dict[origin].append(conflict)
    return conflict_dict

# 충돌 해결을 위한 함수
def resolve_conflicts(class_set, df_list):
    conflict_dict = check_conflicts(class_set, df_list)
    while conflict_dict:
        for origin, conflicts in conflict_dict.items():
            for conflict in conflicts:
                conflict_dfs = [df for df in df_list if conflict in df['Course Combined'].values]
                if conflict_dfs:
                    conflict_df = choice(conflict_dfs)
                    course_to_move = conflict_df[conflict_df['Course Combined'] == conflict]
                    conflict_df.drop(conflict_df[conflict_df['Course Combined'] == conflict].index, inplace=True)
                    non_conflict_dfs = [df for df in df_list if conflict not in df['Course Combined'].values]
                    if non_conflict_dfs:
                        target_df = choice(non_conflict_dfs)
                        target_df = pd.concat([target_df, course_to_move], ignore_index=True)
        conflict_dict = check_conflicts(class_set, df_list)
    return df_list

# 시간표를 생성하는 함수
def generate_timetable(df):
    df.fillna(method='ffill', inplace=True)
    df['Total time'] = ((pd.to_datetime(df['End Time'].astype('string')) - pd.to_datetime(df['Start Time'].astype('string')))).dt.total_seconds() / 60
    df['Start Time'], df['End Time'] = None, None
    df = df[df['Total time'] > 0]
    start_time = {
        0: '9:00 AM',
        1: '10:30 AM',
        2: '12:30 PM',
        3: '2:00 PM',
        4: '3:30 PM',
        5: '5:00 PM'
    }
    num = df.shape[0] // 6
    extra = df.shape[0] % 6
    lst = [num for _ in range(6)]
    for _ in range(extra):
        idx = randint(0, 5)
        lst[idx] += 1
    time_slots = []
    for i in range(6):
        time_slots += [start_time[i]] * lst[i]
    np.random.shuffle(time_slots)
    df['Start Time'] = time_slots
    df['End Time'] = df.apply(calculate_end_time, axis=1)
    df['SBC'] = df['SBC'].fillna(' ')
    return df

def process_and_store_data(path):
    global processed_data
    # Read class_set.xlsx for conflict information
    class_set_path = os.path.join(app.config['UPLOAD_FOLDER'], 'class_set.xlsx')
    class_set = pd.read_excel(class_set_path)
    
    # Extract year and semester from the path
    year, semester = path.split('_')[1], path.split('_')[2]

    # Read the specific file from the path first
    main_df = pd.read_excel(path)
    main_file = os.path.basename(path)

    # Read all other course_{year}_{semester}_*.xlsx files except the main file
    other_files = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.startswith(f'course_{year}_{semester}_') and f.endswith('.xlsx') and f != main_file]
    other_dfs = [pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], file)) for file in other_files]

    # Ensure the main DataFrame is the first element in df_list
    df_list = [main_df] + other_dfs

    # Generate timetable for each DataFrame
    df_list = [generate_timetable(df) for df in df_list]
    
    # Resolve conflicts
    df_list = resolve_conflicts(class_set, df_list)


    # Save the processed data back to files
    for df, file in zip(df_list, [main_file] + other_files):
        df.to_excel(os.path.join(app.config['UPLOAD_FOLDER'], file), index=False)

    # Convert the final processed DataFrame to dictionary
    processed_data= df_list[0].to_dict(orient='records')
    return df_list[0]

# def process_and_store_data(path):
#     # Read CSV and process data
#     df = pd.read_excel(path, sheet_name=0)

#     # remove here after making real web
#     df.fillna(method='ffill', inplace=True)
#     df['Total time'] = ((pd.to_datetime(df['End Time'].astype('string')) - pd.to_datetime(df['Start Time'].astype('string')))).dt.total_seconds() / 60
   
#     df['Start Time'], df['End Time'] = None, None
#     df = df[df['Total time'] >0]
#     # remove here after making real web
#     start_time = {
#     0: '9:00 AM',
#     1:'10:30 AM', 
#     2: '12:30 PM',
#     3: '2:00 PM',
#     4: '3:30 PM',
#     5: '5:00 PM'
#     }

#     num = df.shape[0] // 6
#     extra = df.shape[0] % 6

#     lst = [num for _ in range(6)]

#     for _ in range(extra):
#         idx = randint(0, num-1)
#         lst[idx] += 1

#     time_slots = []

#     for i in range(6):
#         time_slots += [start_time[i]] * lst[i]
                
#     np.random.shuffle(time_slots)         
#     df['Start Time'] = time_slots

#     df['End Time'] = df.apply(calculate_end_time, axis=1)
#     df['SBC'] = df['SBC'].fillna(' ')
#     global processed_data
#     processed_data = json.loads(json.dumps(df.to_dict(orient='records')))

#     return df

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

@app.route('/login', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])

# def login():
#     user_data = request.get_json()
#     username = user_data.get('username')
#     password = user_data.get('password')

#     if username == 'admin@gmail.com' and password == 'password':
#         return jsonify({"message": "Login successful", "status": "success"}), 200
#     else:
#         return jsonify({"message": "Invalid credentials", "status": "fail"}), 401

def login():
    user_data = request.get_json()
    username = user_data.get('username')
    password = user_data.get('password')
    users = {
        'ams@ams': 'ams',
        'bm@bm': 'bm',
        'cs@cs': 'cs',
        'ece@ece': 'ece',
        'mec@mec': 'mec',
        'tsm@tsm': 'tsm',
    }

    if username in users and password == users[username]:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    else:
        return jsonify({"message": "Invalid credentials", "status": "fail"}), 401

@app.route('/courses', methods=['GET'])
def get_data():

    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(debug=True)

