import DOMPurify from 'dompurify';
import { Clock4 } from 'lucide-react';

import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import MyPieChart from '@/app/my_components/MyPieChart';

function formatNutrition(nutrition){
  if (!nutrition || typeof nutrition.percentCarbs === 'undefined' || typeof nutrition.percentFat === 'undefined' || typeof nutrition.percentProtein === 'undefined') {
      return [];
  }
  let items = [];
  items.push({key: "carbs", value: nutrition.percentCarbs, color: "#fcba03"});
  items.push({key: "fat", value: nutrition.percentFat, color: "#fc6603"});
  items.push({key: "protein", value: nutrition.percentProtein, color: "#fc3503"});
  return items;
}



export default function MyCarousel({items}){
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

    if (!Array.isArray(items) || items.length === 0){
        return null;
    }

    return (
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="w-full">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Card key={index} className="justify-between max-w-md mx-auto overflow-auto">
                            <CardHeader className="p-0">
                                <img className="w-full h-48 object-cover" src={item.image} alt={item.title}></img>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-between gap-4 text-sm text-muted-foreground"> 
                                
                                <div className="flex flex-row items-center gap-4">
                                    {item.readyInMinutes && <div className="flex items-center gap-1" aria-label={`Ready in ${item.readyInMinutes} minutes`}>
                                        <Clock4 className="h-4 w-4"/>
                                        <p>{Math.floor(item.readyInMinutes / 60)}h {Math.floor(item.readyInMinutes % 60)}min <span className="sr-only">min</span></p>
                                    </div>}
                                </div>
                                </div>
                                <CardTitle className="leading-6 text-justify">{item.title}</CardTitle>
                                <CardDescription>
                                {!nutritionVisible[index] ? (
                                    <p className="line-clamp-3 text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.summary) }} />
                                ) : (
                                    <MyPieChart 
                                    title="Nutrition"
                                    desc="Caloric Breakdown"
                                    toolTipLabel="percentege"
                                    listLabel="nutrients"
                                    items={formatNutrition(item.nutrition.caloricBreakdown)}></MyPieChart>
                                )}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2">
                                <Button variant="outline"
                                onClick={() => handleSetNutrition(index)}
                                >{nutritionVisible[index] ? "Description" : "Nutrition"}</Button>
                                <Button onClick={() => goToRecipe(item.id)}>Cook it</Button>
                            </CardFooter>
                            </Card>
                    </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    )
}