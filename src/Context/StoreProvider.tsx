import { useEffect, useState } from 'react';
import { CategoryType, FoodCardType } from '../Utils/Types';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';

export type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [recipes, setRecipes] = useState([] as FoodCardType[]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [showByDoneFilter, setShowByDoneFilter] = useState(false);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([] as FoodCardType[]);
  const [showByFavFilter, setShowByFavFilter] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState([] as FoodCardType[]);
  const [foodsData, setFoodsData] = useState([] as FoodCardType[]);
  const [drinksData, setDrinksData] = useState([] as FoodCardType[]);
  const [foodsCategories, setFoodsCategories] = useState<CategoryType[]>([]);
  const [drinksCategories, setDrinksCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function requestFoodsAndDrinksFromAPI() {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const allMealsPromises = alphabet.split('').map(async (letter) => {
        const mealsResponse = await requestApi('meals', 'firstLetter', letter);
        if (mealsResponse.meals) {
          const result = mealsResponse.meals;
          return DealResponse('meals', result);
        }
        return [];
      });

      const allMealsResults = await Promise.all(allMealsPromises);
      const allMeals = allMealsResults.flat();

      setFoodsData(allMeals);

      const allDrinksPromises = alphabet.split('').map(async (letter) => {
        const drinksResponse = await requestApi('drinks', 'firstLetter', letter);
        if (drinksResponse.drinks) {
          const result = drinksResponse.drinks;
          return DealResponse('drinks', result);
        }
        return [];
      });

      const allDrinksResults = await Promise.all(allDrinksPromises);
      const allDrinks = allDrinksResults.flat();

      setDrinksData(allDrinks);
    }

    async function requestFoodsAndDrinksCategoriesFromAPI() {
      const mealsResponse = await requestApi('meals', 'categories', '');
      if (mealsResponse.meals) {
        const result = mealsResponse.meals;
        setFoodsCategories(result);
      }
      const drinksResponse = await requestApi('drinks', 'categories', '');
      if (drinksResponse.drinks) {
        const result = drinksResponse.drinks;
        setDrinksCategories(result);
      }
    }
    requestFoodsAndDrinksFromAPI();
    requestFoodsAndDrinksCategoriesFromAPI();
  }, []);

  const handleDoneRecipes = (filter : string) => {
    const newDoneRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('doneRecipes') || '[]'),
    );
    setFilteredDoneRecipes(newDoneRecipes);
    setShowByDoneFilter(true);
  };
  const handleFavorites = (filter : string) => {
    const newFavRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
    setFilteredFavRecipes(newFavRecipes);
    setShowByFavFilter(true);
  };

  const removeFavorites = (recipe : string) => {
    const newFavs = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
      .filter((favs :any) => favs.name !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  };

  // Recipes e SearchBar
  const handleRecipes = (newRecipes: FoodCardType[]) => {
    setRecipes(newRecipes);
  };

  return (
    <StoreContext.Provider
      value={ {
        handleDoneRecipes,
        handleFavorites,
        removeFavorites,
        handleRecipes,
        setLoadingPage,
        recipes,
        showByDoneFilter,
        filteredDoneRecipes,
        showByFavFilter,
        filteredFavRecipes,
        loadingPage,
        foodsData,
        drinksData,
        foodsCategories,
        drinksCategories,
      } }
    >
      <div>
        {children}
      </div>
    </StoreContext.Provider>
  );
}

export default StoreProvider;
