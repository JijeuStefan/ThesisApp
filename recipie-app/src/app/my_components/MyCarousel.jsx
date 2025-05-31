import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function MyCarousel({items}){
    return (
        <Carousel>
            <CarouselContent className="w-full max-w-sm">
                {items.length > 0 && (
                    items.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Card key={index} className="justify-between max-w-md mx-auto overflow-auto">
                                <CardHeader className="p-0">
                                    <img className="w-full h-48 object-cover" src={item.image} alt={item.title}></img>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <div className="flex flex-row items-center justify-between gap-4 text-sm text-muted-foreground"> {/* Style container */}
                                    {includeIngredients.length > 0 && (
                                        <div className="flex flex-row items-center gap-4">
                                        {item.usedIngredientCount != null && <div className="flex items-center" aria-label={`${item.usedIngredientCount} ingredients used`}>
                                            <Check className="h-5 w-5 text-green-600"/>
                                            <p>{includeIngredients.length - item.unusedIngredients.length} <span className="sr-only">used</span></p>
                                        </div>}
                                        
                                        {item.missedIngredientCount != null && <div className="flex items-center" aria-label={`${item.missedIngredientCount} ingredients missed`}>
                                            <X className="h-5 w-5 text-red-600"/>
                                            <p>{item.missedIngredientCount} <span className="sr-only">missed</span></p>
                                        </div>}
                                    </div>
                                    )}
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
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}