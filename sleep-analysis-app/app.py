from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://192.168.1.32:8080"}})

CSV_FILE = 'Sleep_health_and_lifestyle_dataset.csv'

@app.route('/api/next-person-id', methods=['GET'])
def get_next_person_id():
    df = pd.read_csv(CSV_FILE)
    next_id = df['Person ID'].max() + 1
    return jsonify({"nextPersonId": str(next_id)})

@app.route('/api/survey', methods=['POST'])
def submit_survey():
    data = request.json
    df = pd.read_csv(CSV_FILE)
    
    new_row = pd.DataFrame([data])
    df = pd.concat([df, new_row], ignore_index=True)
    
    df.to_csv(CSV_FILE, index=False)
    
    return jsonify({"message": "Survey data added successfully"}), 200

@app.route('/api/data', methods=['GET'])
def get_data():
    df = pd.read_csv(CSV_FILE)
    return jsonify(df.to_dict('records'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)