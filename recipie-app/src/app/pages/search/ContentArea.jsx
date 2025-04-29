import axios from "axios";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function ContentArea(){
    const [recipies, setRecipies] = useState("");
    let subArray =[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6];
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: {
          query: 'side salad',
          diet: 'vegetarian',
          intolerances: 'gluten',
          includeIngredients: 'cheese,nuts',
          excludeIngredients: 'eggs',
          instructionsRequired: 'true',
          fillIngredients: 'false',
          addRecipeInformation: 'false',
          addRecipeInstructions: 'false',
          addRecipeNutrition: 'false',
          maxReadyTime: '45',
          ignorePantry: 'true',
          sort: 'max-used-ingredients',
          offset: '0',
          number: '10'
        },
        headers: {
          'x-rapidapi-key': ``,
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };


    async function handleClick() {
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setRecipies(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }


      

    return (
        <div className="grid grid-cols-1 items-start p-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* <Button onClick={handleClick}>Fetch Data</Button> */}
            { subArray.map((recipie) => {
                return (
                    <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                      <CardTitle>Create project</CardTitle>
                      <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Framework</Label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                <SelectItem value="astro">Astro</SelectItem>
                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button>
                    </CardFooter>
                  </Card>
                )
                
            })}
            {/* {recipies ?  (recipies.map((recipie) => {
                return (
                    <Card key={recipie} className="w-[300px]">
                        <CardHeader className="p-0">
                            <div className="w-full overflow-hidden">
                                <img src={recipie.image} alt="House" className="w-full h-full object-cover" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
            
                )
            })) : <div>Loading...</div>
            } */}
        </div>
    )
}

