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


export default function ContentArea({recipes}){
    return (
      <div className="container mx-auto p-4">     
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            { recipes && recipes.map((recipe, index) => {
                return (
                    <Card key={index} className="justify-between h-full w-full max-w-md mx-auto overflow-hidden">
                      <CardHeader className="p-0">
                        <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.title}></img>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2">
                      <div className="flex flex-row items-center justify-between gap-4 text-sm text-muted-foreground"> {/* Style container */}
                        <div className="flex flex-row items-center gap-4">
                            {recipe.usedIngredientCount && <div className="flex items-center" aria-label={`${recipe.usedIngredientCount} ingredients used`}>
                                <Check className="h-5 w-5 text-green-600"/>
                                <p>{recipe.usedIngredientCount} <span className="sr-only">used</span></p>
                            </div>}

                            {recipe.missedIngredientCount && <div className="flex items-center" aria-label={`${recipe.missedIngredientCount} ingredients missed`}>
                                <X className="h-5 w-5 text-red-600"/>
                                <p>{recipe.missedIngredientCount} <span className="sr-only">missed</span></p>
                            </div>}
                          </div>
                        <div className="flex flex-row items-center gap-4">
                          {recipe.readyInMinutes && <div className="flex items-center gap-1" aria-label={`Ready in ${recipe.readyInMinutes} minutes`}>
                              <Clock4 className="h-4 w-4"/>
                              <p>{Math.floor(recipe.readyInMinutes / 60)}h {Math.floor(recipe.readyInMinutes % 60)}min <span className="sr-only">min</span></p>
                          </div>}
                        </div>
                      </div>
                        <CardTitle className="leading-6 text-justify">{recipe.title}</CardTitle>
                        <CardDescription>
                          <p className="line-clamp-3 text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.summary) }} />
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Nutrition</Button>
                        <Button>Cook it</Button>
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

