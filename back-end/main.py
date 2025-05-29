from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes"

HEADERS = {
    "x-rapidapi-key": "bfd9da871dmsh10eeb904727a804p1de28cjsneaa62617842a",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
}


@app.get("/recipes")
def get_recipes():
    url = f"{URL}/complexSearch"
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
    url = f"{URL}/{id}/information"

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


if __name__ == '__main__':
    app.run()
