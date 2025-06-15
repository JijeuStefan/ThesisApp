from flask import Flask, request
from flask_cors import CORS
import requests
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


@app.get("/images/upload")
def upload_images():
    time.sleep(5)
    return {"success": "Finished"}, 200


if __name__ == '__main__':
    if not api_key:
        raise ValueError("API_KEY not set in environment variables.")
    app.run()
