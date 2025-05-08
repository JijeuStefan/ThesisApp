import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';


function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

const SPOONACULAR_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || ""; 
const SPOONACULAR_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

export function useIngredientInput() {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFromSuggestion, setIsFromSuggestion] = useState(false);

    const handleInputChange = useCallback((e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        const wasSuggestion = suggestions.some(s => s.name === newValue);
        setIsFromSuggestion(wasSuggestion);
    }, [suggestions]); 

    const clearInput = useCallback(() => {
        setInputValue('');
        setSuggestions([]);
        setIsFromSuggestion(false);
    }, []);

    const fetchSuggestions = useCallback(async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const options = {
                method: 'GET',
                url: `https://${SPOONACULAR_HOST}/food/ingredients/autocomplete`,
                params: { query, number: '10' },
                headers: {
                    'x-rapidapi-key': SPOONACULAR_API_KEY,
                    'x-rapidapi-host': SPOONACULAR_HOST
                }
            };
            const response = await axios.request(options);
            setSuggestions(response.data || []);
        } catch (error) {
            console.error("Error fetching ingredient suggestions:", error);
            setSuggestions([]);
        }
    }, []);

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

    useEffect(() => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput.length >= 2 && !isFromSuggestion) {
            debouncedFetch(trimmedInput);
        } else if (trimmedInput.length < 2) {
            setSuggestions([]);
        }
    }, [inputValue, debouncedFetch, isFromSuggestion]);

    return {
        inputValue,
        setInputValue, 
        suggestions,
        isFromSuggestion, 
        handleInputChange,
        clearInput, 
    };
}