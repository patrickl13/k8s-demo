from flask import Flask, jsonify, request

app = Flask(__name__)
classes = [
    {
        'id': 1,
        'class': 'SOEN 387',
        'prerequisites': [
            {
            'class': 'COMP 353'
            },
            {
            'class': 'COMP 354'
            },
            {
            'class': 'SOEN 287'
            }
        ] 
    },
    {
        'id': 2,
        'class': 'COMP 353',
        'prerequisites': [
            {
            'class': 'COMP 232'
            },
            {
            'class': 'COMP 352'
            }
        ] 
    }  
]

@app.route('/classes') 
def get_classes():
    return jsonify({'classes':classes})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)