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
                url: 'http://localhost:5000/ingredients/suggestion',
                params: { query, number: '10' }
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