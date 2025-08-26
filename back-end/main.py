from flask import Flask, request
from flask_cors import CORS
import requests
from ultralytics import YOLO
import time

from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")

URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

HEADERS = {
    "x-rapidapi-key": api_key,
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
}

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/recipes")
def get_recipes():
    url = f"{URL}/recipes/complexSearch"
    querystring = request.args.to_dict()

    response = requests.get(url, headers=HEADERS, params=querystring)

    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return {"error": "Failed to fetch recipe"}, response.status_code

    try:
        data = response.json()
        return data
    except ValueError:
        print(f"Invalid JSON response: {response.text}")
        return {"error": "Invalid JSON from Spoonacular"}, 500


@app.get("/recipe/<int:id>")
def get_recipe_by_id(id):
    url = f"{URL}/recipes/{id}/information"

    querystring = {"includeNutrition": "true"}

    response = requests.get(url, headers=HEADERS, params=querystring)

    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return {"error": "Failed to fetch recipe"}, response.status_code

    try:
        data = response.json()
        return data
    except ValueError:
        print(f"Invalid JSON response: {response.text}")
        return {"error": "Invalid JSON from Spoonacular"}, 500


@app.get("/ingredients/suggestion")
def get_ingredients_suggestion():
    url = f"{URL}/food/ingredients/autocomplete"

    querystring = request.args.to_dict()

    response = requests.get(url, headers=HEADERS, params=querystring)

    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return {"error": "Failed to fetch recipe"}, response.status_code

    try:
        data = response.json()
        return data
    except ValueError:
        print(f"Invalid JSON response: {response.text}")
        return {"error": "Invalid JSON from Spoonacular"}, 500


@app.get("/recipes/random")
def get_similar_recipes():
    url = f"{URL}/recipes/random"

    querystring = request.args.to_dict()

    response = requests.get(url, headers=HEADERS, params=querystring)

    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return {"error": "Failed to fetch recipe"}, response.status_code

    try:
        data = response.json()
        return data
    except ValueError:
        print(f"Invalid JSON response: {response.text}")
        return {"error": "Invalid JSON from Spoonacular"}, 500


def detect_food(image_path):
    pretrained_models = ["./models/vegetables/best.pt"]
    detected_objects = set()

    for pretrained_model in pretrained_models:
        model = YOLO(pretrained_model)
        results = model.predict(image_path, save=True, project="./detect")

        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                label = model.names[cls_id]
                detected_objects.add(label)

    return detected_objects


@app.post("/images/upload")
def upload_images():
    if "images" not in request.files:
        return {"error": "No images part in the request"}, 400

    files = request.files.getlist("images")

    if not files:
        return {"error": "No files uploaded"}, 400

    detected_ingredients = set()

    for file in files:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        print(f"Received and saved {filepath}")

        detected_objects = detect_food(filepath)
        detected_ingredients.update(detected_objects)

    print(detected_ingredients)

    return {"detected_ingredients": list(detected_ingredients)}, 200


if __name__ == '__main__':
    if not api_key:
        raise ValueError("API_KEY not set in environment variables.")
    app.run()
