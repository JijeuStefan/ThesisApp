import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import MyCard from './MyCard';


export default function MyCarousel({items}){
    if (!Array.isArray(items) || items.length === 0){
        return null;
    }

    return (
        <Carousel 
        opts={{
            align: "start",
            loop: true,}} 
        className="h-full w-full">
            <CarouselContent className="h-full w-full">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <MyCard
                        key={index}
                        recipe={item}
                        />
                    </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    )
}