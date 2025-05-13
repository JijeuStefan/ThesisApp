import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchRecipies from './app/pages/search/SearchRecipies.jsx'
import RecipePage from './app/pages/recipe/RecipePage.jsx';

export default function App(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<SearchRecipies/>}/>
                <Route path='/recipe/:id' element={<RecipePage/>}/>
            </Routes>
        </div>
    )
}