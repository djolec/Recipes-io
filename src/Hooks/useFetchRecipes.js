import React from 'react'
import axios from 'axios'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const app_id = '0147e6e9'
const app_key = '093e3ffc7a191b17f18159be10b28878'
const type = 'public'

const fetchMealData = (meal) => {
    return axios.get(`https://api.edamam.com/api/recipes/v2/?type=${type}&app_id=${app_id}&app_key=${app_key}&mealType=${meal}`)
}

const fetchCuisineData = (cuisine) => {
    return axios.get(`https://api.edamam.com/api/recipes/v2/?type=${type}&app_id=${app_id}&app_key=${app_key}&cuisineType=${cuisine}`)
}

const fetchFilteredData = (inputValue, queryCookingTime, queryIngredients, queryCalories, queryDiet, queryHealth, queryMeal, queryDish, queryCuisine, { pageParam = `https://api.edamam.com/api/recipes/v2/?type=${type}&app_id=${app_id}&app_key=${app_key}${inputValue}${queryCookingTime}${queryIngredients}${queryCalories}${queryDiet}${queryHealth}${queryMeal}${queryDish}${queryCuisine}`}) => {
    return axios.get(pageParam)
}

const fetchRecipeDetails = (recipe) => {
    return axios.get(`${recipe}?type=${type}&app_id=${app_id}&app_key=${app_key}`)
}

export const useFetchMeals = (meal) => {
    return useQuery(["search-meal", meal], () => fetchMealData(meal), {
        enabled: false,
        refetchOnWindowFocus: false
    })
}

export const useFetchCuisine = (cuisine) => {
    return useQuery(["search-cuisine", cuisine], () => fetchCuisineData(cuisine), {
        enabled: false,
        refetchOnWindowFocus: false
    })
}

export const useFilteredRecipes = (inputValue, queryCookingTime, queryIngredients, queryCalories, queryDiet, queryHealth, queryMeal, queryDish, queryCuisine) => {
    return useInfiniteQuery(["filtered"],(pageParam) => fetchFilteredData(inputValue, queryCookingTime, queryIngredients, queryCalories, queryDiet, queryHealth, queryMeal, queryDish, queryCuisine, pageParam), {
        enabled: false,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            const pageParam = lastPage?.data?._links?.next?.href || undefined
            return pageParam
        }
    })
}

export const useRecipeDetails = (recipe) => {
    return useQuery(["recipeDetails", recipe], () => fetchRecipeDetails(recipe),{
        enabled: false,
        refetchOnWindowFocus: false
    }) 
}