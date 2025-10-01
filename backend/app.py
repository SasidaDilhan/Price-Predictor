import pickle
from flask import Flask, jsonify, render_template, request
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def predictoin(list):
    filename = 'model/predictor.pickel'

    with open(filename, 'rb') as file:
        model = pickle.load(file)
    pred_value = model.predict([list])
    return pred_value

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON payload from Next.js
    ram = data.get('ram')
    weight = data.get('weight')
    company = data.get('company')
    typename = data.get('typename')
    opsys = data.get('opsys')
    cpuname = data.get('cpuname')
    gpuname = data.get('gpuname')
    touchscreen = data.get('touchscreen', False)
    ips = data.get('ips', False)

    feature_list = []
    feature_list.append(int(ram))
    feature_list.append(float(weight))
    feature_list.append(1 if touchscreen else 0)
    feature_list.append(1 if ips else 0)

    # Lists for one-hot encoding
    company_list = ['acer', 'apple', 'asus', 'dell', 'hp', 'lenovo', 'msi', 'other', 'toshiba']
    typename_list = ['2in1convertible', 'gaming', 'netbook', 'notebook', 'ultrabook', 'workstation']
    opsys_list = ['linux', 'mac', 'other', 'windows']
    cpu_list = ['amd', 'intelcorei3', 'intelcorei5', 'intelcorei7', 'other']
    gpu_list = ['amd', 'intel', 'nvidia']

    def traves(lst, value):
        for item in lst:
            feature_list.append(1 if item == value else 0)

    traves(company_list, company)
    traves(typename_list, typename)
    traves(opsys_list, opsys)
    traves(cpu_list, cpuname)
    traves(gpu_list, gpuname)

    pred = predictoin(feature_list) * 302.26
    pred = float(np.round(pred[0], 2))

    return jsonify({"prediction": pred})

if __name__ == '__main__':
    app.run(debug=True)

