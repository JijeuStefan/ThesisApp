
import { Skeleton } from "@/components/ui/skeleton"
import MyCard from '@/app/my_components/MyCard';



export default function ContentArea({recipes, isLoading}){
    return (
      <div className="container mx-auto p-4">     
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              [...Array(6)].map((_,index) => {
                return (<Skeleton key={index} className="h-[500px] w-full max-w-md mx-auto bg-gray-400"></Skeleton>)
              })
            ) : (
              recipes && recipes.map((recipe, index) => {
                return (
                    <MyCard
                    key={index}
                    recipe={recipe}
                    />
                )}))}
        </div>
        </div>
    )
}

