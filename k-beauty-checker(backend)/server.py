from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # 모든 출처에서의 요청을 허용합니다.

# 프로젝트 루트 디렉토리를 기준으로 경로 설정
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
products_json_path = os.path.join(project_root, 'k-beauty-checker', 'public', 'products.json')

def read_products():
    try:
        if not os.path.exists(products_json_path):
            return []
        with open(products_json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def write_products(products):
    with open(products_json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

@app.route('/api/products', methods=['GET'])
def get_products():
    products = read_products()
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def add_product():
    new_product = request.json
    products = read_products()
    new_product['id'] = max([p['id'] for p in products]) + 1 if products else 1
    products.append(new_product)
    write_products(products)
    return jsonify(new_product), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    updated_data = request.json
    products = read_products()
    for i, product in enumerate(products):
        if product['id'] == product_id:
            products[i] = {**product, **updated_data}
            write_products(products)
            return jsonify(products[i])
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    products = read_products()
    products = [p for p in products if p['id'] != product_id]
    write_products(products)
    return jsonify({"message": "Product deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
