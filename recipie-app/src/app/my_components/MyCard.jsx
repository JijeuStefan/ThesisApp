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
import MyPieChart from '@/app/my_components/MyPieChart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatNutrition(nutrition){
  if (!nutrition) return [];
  let items = [];
  items.push({key: "carbs", value: nutrition.percentCarbs, color: "#fcba03"});
  items.push({key: "fat", value: nutrition.percentFat, color: "#fc6603"});
  items.push({key: "protein", value: nutrition.percentProtein, color: "#fc3503"});
  return items;
}


export default function MyCard({recipe}){
    const [nutritionVisible, setNutritionVisible] = useState(false);
    const navigate = useNavigate();

    const goToRecipe = (id) =>{
      navigate(`/recipe/${id}`)
    }

    const handleSetNutrition = () => {
      setNutritionVisible(prev => !prev)}
    return (
    <Card className="justify-between h-[470px] w-full max-w-md mx-auto overflow-auto">
        <CardHeader className="gap-4 p-0 overflow-x-clip">
        <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.title}></img>
        
        <div className="flex flex-row items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
            <div className="flex flex-row items-center gap-4">
            {recipe.usedIngredientCount != null && <div className="flex items-center" aria-label={`${recipe.usedIngredientCount} ingredients used`}>
                <Check className="h-5 w-5 text-green-600"/>
                <p>{recipe.usedIngredientCount} <span className="sr-only">used</span></p>
            </div>}
            
            {recipe.missedIngredientCount != null && <div className="flex items-center" aria-label={`${recipe.missedIngredientCount} ingredients missed`}>
                <X className="h-5 w-5 text-red-600"/>
                <p>{recipe.missedIngredientCount} <span className="sr-only">missed</span></p>
            </div>}
            </div>
            <div className="flex flex-row items-center gap-2">
            {recipe.readyInMinutes && <div className="flex items-center gap-1" aria-label={`Ready in ${recipe.readyInMinutes} minutes`}>
                <Clock4 className="h-4 w-4"/>
                <p>{Math.floor(recipe.readyInMinutes / 60)}h {Math.floor(recipe.readyInMinutes % 60)}min <span className="sr-only">min</span></p>
            </div>}
            </div>
        </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
        <CardTitle className="text-justify"><a href={`/recipe/${recipe.id}`}>{recipe.title}</a></CardTitle>
        <CardDescription>
            {!nutritionVisible ? (
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
            onClick={handleSetNutrition}
        >{nutritionVisible ? "Description" : "Nutrition"}</Button>
        <Button className="bg-[#cc7a3d] hover:bg-[#b9611d]" onClick={() => goToRecipe(recipe.id)}>Cook it</Button>
        </CardFooter>
    </Card>
    )
}