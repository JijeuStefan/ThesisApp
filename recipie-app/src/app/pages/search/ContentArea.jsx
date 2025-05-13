import DOMPurify from 'dompurify';
import { Check, X, Clock4 } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPieChart from '@/app/my_components/MyPieChart';


function formatNutrition(nutrition){
  let items = [];
  items.push({key: "carbs", value: nutrition.percentCarbs, color: "#fcba03"});
  items.push({key: "fat", value: nutrition.percentFat, color: "#fc6603"});
  items.push({key: "protein", value: nutrition.percentProtein, color: "#fc3503"});
  return items;
}


export default function ContentArea({recipes, includeIngredients}){
    const [nutritionVisible, setNutritionVisible] = useState({});
    const navigate = useNavigate();

    const goToRecipe = (id) =>{
      navigate(`/recipe/${id}`)
    }

    const handleSetNutrition = (index) => {
      setNutritionVisible((prev) =>({
        ...prev,
        [index] : !prev[index]
      })
    )}

    return (
      <div className="container mx-auto p-4">     
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            { recipes && recipes.map((recipe, index) => {
                return (
                    <Card key={index} className="justify-between h-[500px] w-full max-w-md mx-auto overflow-auto">
                      <CardHeader className="p-0">
                        <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.title}></img>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-between gap-4 text-sm text-muted-foreground"> {/* Style container */}
                          {includeIngredients.length > 0 && (
                            <div className="flex flex-row items-center gap-4">
                              {recipe.usedIngredientCount != null && <div className="flex items-center" aria-label={`${recipe.usedIngredientCount} ingredients used`}>
                                  <Check className="h-5 w-5 text-green-600"/>
                                  <p>{includeIngredients.length - recipe.unusedIngredients.length} <span className="sr-only">used</span></p>
                              </div>}
                            
                              {recipe.missedIngredientCount != null && <div className="flex items-center" aria-label={`${recipe.missedIngredientCount} ingredients missed`}>
                                  <X className="h-5 w-5 text-red-600"/>
                                  <p>{recipe.missedIngredientCount} <span className="sr-only">missed</span></p>
                              </div>}
                          </div>
                          )}
                          <div className="flex flex-row items-center gap-4">
                            {recipe.readyInMinutes && <div className="flex items-center gap-1" aria-label={`Ready in ${recipe.readyInMinutes} minutes`}>
                                <Clock4 className="h-4 w-4"/>
                                <p>{Math.floor(recipe.readyInMinutes / 60)}h {Math.floor(recipe.readyInMinutes % 60)}min <span className="sr-only">min</span></p>
                            </div>}
                          </div>
                        </div>
                        <CardTitle className="leading-6 text-justify">{recipe.title}</CardTitle>
                        <CardDescription>
                          {!nutritionVisible[index] ? (
                            <p className="line-clamp-3 text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.summary) }} />
                          ) : (
                            <MyPieChart 
                            title="Nutrition"
                            desc="Caloric Breakdown"
                            toolTipLabel="percentege"
                            listLabel="nutrients"
                            items={formatNutrition(recipe.nutrition.caloricBreakdown)}></MyPieChart>
                          )}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between gap-2">
                        <Button variant="outline"
                          onClick={() => handleSetNutrition(index)}
                        >{nutritionVisible[index] ? "Description" : "Nutrition"}</Button>
                        <Button onClick={() => goToRecipe(recipe.id)}>Cook it</Button>
                      </CardFooter>
                  </Card>
                )})
            }
            {recipes.length === 0 && (
              <div className="coll-span-full text-start text-muted-foreground">No recipes found</div>)}
        </div>
        </div>
    )
}

