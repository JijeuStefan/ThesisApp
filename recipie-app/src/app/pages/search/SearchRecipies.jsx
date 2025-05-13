import axios from "axios";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Header from "../../my_components/header";
import ContentArea from "./ContentArea";
import SidebarArea from "./sidebar/SidebarArea";
import SearchTitle from "./SearchTitle";
import { useState } from "react";

const defaultParams = {
  query: '',
  cuisine: '',
  diet: '',
  intolerances: [],
  includeIngredients: [],
  excludeIngredients: [],
  maxReadyTime: ''
}


export default function SearchRecipies(){
    const [searchParams, setSearchParams] = useState(defaultParams);
    const [recipes, setRecipes] = useState([]);

    const handleQueryChange = ((newQuery) => {
      setSearchParams((prev) => ({...prev,query:newQuery}));
    });

    const handleParamChange  = ((param, newValue) => {
      setSearchParams((prev) => ({...prev,[param]:newValue}));
    });

    const handleIncludeIngredient = ((ingredient, include) =>{
      setSearchParams((prev) =>({
        ...prev,
        includeIngredients: include ?
        [...prev.includeIngredients, ingredient] :
        prev.includeIngredients.filter((item) => item != ingredient)
      }))
    })

    const handleExcludeIngredient = ((ingredient, exclude) =>{
      setSearchParams((prev) =>({
        ...prev,
        excludeIngredients: exclude ?
        [...prev.excludeIngredients, ingredient] :
        prev.excludeIngredients.filter((item) => item != ingredient)
      }))
    })

    const handleIntoleranceChange = ((intolerance, checked) =>{
      setSearchParams((prev) => ({
        ...prev,
        intolerances: checked ?
        [...prev.intolerances, intolerance] :
        prev.intolerances.filter((item) => item !== intolerance)
      }));
    });


    async function fetchRecipes() {
      setRecipes([]);

      const apiParams = {
        instructionsRequired: 'false',
        fillIngredients: 'true',
        addRecipeInformation: 'true',
        addRecipeInstructions: 'false',
        addRecipeNutrition: 'true',
        ignorePantry: 'true',
        sort: searchParams.includeIngredients.length > 0 ? "max-used-ingredients" : "random",
        offset: '0',
        number: '24',
        query: searchParams.query,
        ...(searchParams.includeIngredients.length > 0 && {includeIngredients: searchParams.includeIngredients.join(',')}),
        ...(searchParams.excludeIngredients.length > 0 && {excludeIngredients: searchParams.excludeIngredients.join(',')}),
        ...(searchParams.cuisine && {cuisine: searchParams.cuisine}),
        ...(searchParams.diet && {diet: searchParams.diet}),
        ...(searchParams.intolerances.length > 0 && {intolerances: searchParams.intolerances.join(',')}),
        ...(searchParams.maxReadyTime && {maxReadyTime: searchParams.maxReadyTime})
      };


      Object.keys(apiParams).forEach((key) => {
        if ( !apiParams[key] || (Array.isArray(apiParams[key] && apiParams[key].length === 0))){
          delete apiParams[key];
        }
      });

      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: apiParams,
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY || "",
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };

      try {
          const response = await axios.request(options);
          console.log(response.data);
          console.log(apiParams);
          setRecipes(response.data.results);
      } catch (error) {
          console.error(error);
      }
    }



    return (
        <div className="flex flex-col min-h-screen font-inter bg-background">
          <Header />
          <main className="flex-grow">
            <div className="grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)]">
              <div className="row-start-1 row-span-2 hidden shrink-0 md:border-r md:border-gray-950/10 md:sticky md:block h-[calc(100vh-3.5rem)]">
                <div className="block h-full w-full">
                  <SidebarProvider>
                    <SidebarArea
                      searchParams={searchParams}
                      onParamChange={handleParamChange}
                      onIncludeIngredient={handleIncludeIngredient}
                      onExcludeIngredient={handleExcludeIngredient}
                      onIntoleranceChange={handleIntoleranceChange}
                    />
                  </SidebarProvider>
                </div>
              </div>
              <div className="row-start-1 row-span-1 border-b border-gray-950/10 md:col-start-2">
                <div className="block h-full w-full">
                    <SearchTitle
                      query={searchParams.query}
                      onQueryChange={handleQueryChange}
                      fetchRecipes={fetchRecipes}
                    />
                </div>
              </div>
              <div className="row-start-2 row-span-1 border-gray-950/10 overflow-auto">
                <div className="block h-full w-full">
                  <ContentArea
                    recipes={recipes}
                    includeIngredients={searchParams.includeIngredients}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
    )
}

