import axios from 'axios';
import DOMPurify from 'dompurify';
import Header from '@/app/my_components/Header';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyPieChart from '@/app/my_components/MyPieChart';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import MyTable from '@/app/my_components/MyTable';
import { Skeleton } from '@/components/ui/skeleton';
import MyCarousel from '@/app/my_components/MyCarousel';

function formatNutrition(nutrition){
    if (!nutrition) return [];
    let items = [];
    items.push({key: "carbs", value: nutrition.percentCarbs, color: "#fcba03"});
    items.push({key: "fat", value: nutrition.percentFat, color: "#fc6603"});
    items.push({key: "protein", value: nutrition.percentProtein, color: "#fc3503"});
    return items;
}


export default function RecipePage(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [loading, setLoading] = useState(null);

    const navList = [
    { id: "Summary", text: "Summary" },
    { id: "Time", text: "Time" },
    { id: "Ingredients", text: "Ingredients" },
    { id: "Instructions", text: "Instructions" }, 
    { id: "Nutrition", text: "Nutrition" }
];

    useEffect(() =>{
        setLoading(true);
        const fetchData = async() => {
            const options = {
                method: 'GET',
                url: `http://localhost:5000/recipe/${id}`
                };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        
    },[id])
    
    
    useEffect(()=>{
        const fetchData = async()=>{
            const options = {
                method: 'GET',
                url: 'http://localhost:5000/recipes/random',
                params: {number: '5'}
                };

            try {
                const response = await axios.request(options);
                console.log(response.data);                
                if (response.data && Array.isArray(response.data.recipes)){
                    setSimilarRecipes(response.data.recipes);
                } else if( Array.isArray(response.data) ){
                    setSimilarRecipes(response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }

        }
        fetchData();
      
    },[id])
        

    return (
        <div className="flex flex-col min-h-screen font-inter bg-background">
            <Header/>
            <main className="flex-grow">
                {loading ? (
                    <div className='flex flex-row gap-4 p-16 h-[calc(100vh-3.5rem)] w-full'>
                        <Skeleton className="h-full w-full md:w-4/5 bg-gray-400"></Skeleton>
                        <Skeleton className="hidden h-full w-1/5 md:block bg-gray-400"></Skeleton>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 p-16'>
                        <div className='inline-flex'>
                            <Breadcrumb>
                                <BreadcrumbList className="text-md">
                                    <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                    <BreadcrumbPage>Recipe</BreadcrumbPage>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                    <BreadcrumbPage>{recipe.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className='flex flex-col w-full gap-16 md:w-5/6'>
                                <div id="Summary" className='flex flex-col gap-2 scroll-mt-[60px]'>
                                    <p className='inline-flex text-4xl font-bold'>{recipe.title}</p>
                                    <div className='flex flex-col gap-2'>
                                        <img className='rounded-md w-full max-h-[400px] object-cover' src={recipe.image}></img>
                                        <p className='text-justify' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.summary) }}/>
                                    </div>
                                </div>
                                <div id="Time" className="flex flex-col scroll-mt-[60px]">
                                    <div className="flex flex-col gap-2">
                                        <p className='inline-flex text-2xl font-bold'>Time</p>
                                        <div className="flex flex-row items-center justify-around gap-2 p-4 border rounded-sm border-black">
                                            <div className='flex flex-col'>
                                                <p className='inline-flex font-semibold text-[#cc7a3d]'>Preparation time:</p>
                                                <p>{recipe.preparationMinutes ? 
                                                (`${Math.floor(recipe.preparationMinutes / 60)}h ${Math.floor(recipe.preparationMinutes % 60)}min`) : 
                                                ("0min")}
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <p className='inline-flex font-semibold text-[#cc7a3d]'>Cooking time:</p>
                                                <p>{recipe.readyInMinutes ? 
                                                (`${Math.floor(recipe.readyInMinutes / 60)}h ${Math.floor(recipe.readyInMinutes % 60)}min`) : 
                                                ("0min")} 
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div id="Ingredients" className="flex flex-col scroll-mt-[60px]">
                                    <div className="flex flex-col gap-2">
                                        <p className='inline-flex text-2xl font-bold'>Ingredients</p>
                                        <div>
                                            <ul className='marker:text-[#cc7a3d] list-disc list-inside'>
                                                {recipe.extendedIngredients?.map((ingredient, index) => {
                                                    return (<li key={index}>{ingredient.original}</li>)
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="Instructions" className="flex flex-col scroll-mt-[60px]">
                                    <div className="flex flex-col gap-2">
                                        <p className="inline-flex text-2xl font-bold">Instructions</p>
                                        <div className='flex flex-col gap-6'>
                                            <p className='text-justify' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.instructions) }}/>
                                        </div>
                                    </div>
                                </div>
                                <div id="Nutrition" className='flex flex-col scroll-mt-[60px]'>
                                    <div className='flex flex-col gap-2'>
                                        <p className="inline-flex text-2xl font-bold">Nutrition</p>
                                        <div className='flex flex-col gap-2 p-4 border rounded-sm border-black'>
                                            {recipe.nutrition?.caloricBreakdown ? (
                                                <MyPieChart 
                                                title="Caloric Breakdown"
                                                toolTipLabel="percentage"
                                                listLabel="nutrients"
                                                items={formatNutrition(recipe.nutrition.caloricBreakdown)}
                                                />
                                            ): (
                                            <p className="text-gray-500 italic">No caloric breakdown data available.</p>
                                            )}
                                            {recipe.nutrition?.nutrients ? (
                                                <MyTable
                                                caption={"A list of the recipe's nutrients"}
                                                nutrients={recipe.nutrition?.nutrients}
                                                properties={["name", "amount", "unit"]}
                                                />
                                            ): (
                                            <p className="text-gray-500 italic">No nutrients data available.</p>
                                            )}
                                        </div>                                   
                                    </div>
                                </div>     
                            </div>
                            <div id="Navigation" className='hidden shrink-0 top-14 h-[calc(100vh-3.5rem)] w-1/6 pl-6 md:sticky md:block '>
                                <div className="flex flex-col h-full w-full justify-center items-center gap-2">
                                    <div className="block justify-items-start ">
                                        <p className="block px-3 py-1 text-lg font-semibold text-gray-700 mb-2">Navigation</p>
                                        <ul className="flex flex-col gap-3 text-gray-600">
                                            {navList.map((item, index) => (
                                               <li key={index}>
                                                    <a
                                                    href={`#${item.id}`}
                                                    className="block px-3 py-1 rounded hover:bg-[#cc7a3d] hover:text-white transition-colors"
                                                    >{item.text}
                                                    </a>
                                                </li>
                                            ))}                                    
                                        </ul> 
                                    </div>                                                        
                                </div>
                            </div>      
                        </div>
                        <div id="Similar" className='flex flex-col mt-16'>
                            <div className='flex flex-col'>
                                <MyCarousel
                                    items={similarRecipes}>
                                </MyCarousel>                               
                            </div>                                   
                        </div> 
                    </div>
                )}
            </main>
        </div>
    );
}