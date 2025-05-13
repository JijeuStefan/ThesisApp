import axios from 'axios';
import DOMPurify from 'dompurify';
import Header from '@/app/my_components/Header';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function RecipePage(){
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();

    useEffect(() =>{
        const fetchData = async() => {
            const options = {
                method: 'GET',
                url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
                headers: {
                    'x-rapidapi-key': 'bfd9da871dmsh10eeb904727a804p1de28cjsneaa62617842a',
                    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
                };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setRecipe(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        
    },[]) 
        

    return (
        <div className="flex flex-col min-h-screen font-inter bg-background">
            <Header/>
            <main className="flex-grow">
                <div className='flex flex-col gap-4 m-16'>
                    <div className='inline-flex'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                <BreadcrumbPage>Recipe</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className='flex flex-col w-2/3 overflow-auto'>
                            <div id="summary" className='flex flex-col gap-4'>
                                <div className='inline-flex'>
                                    <p className='text-4xl font-bold'>{recipe.title}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <img className='rounded-md h-1/2' src={recipe.image}></img>
                                    <p className='text-justify' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.summary) }}/>
                                </div>
                            </div>
                            <div id="time" className="flex flex-col">
                                <div className="inline-flex">
                                    <p className='text-2xl font-bold'>Time</p>
                                </div>
                            </div>
                            <div id="ingredients" className="flex flex-col">
                                <div className="inline-flex">
                                    <p className='text-2xl font-bold'>Ingredients</p>
                                </div>
                            </div>    
                        </div>
                        <div className='hidden shrink-0 md:sticky md:block'>
                        </div>  
                    </div>
                </div>
            </main>
        </div>
    );
}