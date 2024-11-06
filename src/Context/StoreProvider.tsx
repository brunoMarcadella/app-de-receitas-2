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
    const fetchData = async () => {
      await requestFoodsAndDrinksFromAPI();
      await requestFoodsAndDrinksCategoriesFromAPI();
    };

    const getDataFromLocalStorage = () => {
      setFoodsData(JSON.parse(localStorage.getItem('foodsData') || '[]'));
      setDrinksData(JSON.parse(localStorage.getItem('drinksData') || '[]'));
      setFoodsCategories(JSON.parse(localStorage.getItem('foodsCategories') || '[]'));
      setDrinksCategories(JSON.parse(localStorage.getItem('drinksCategories') || '[]'));
    };

    if (localStorage.getItem('foodsData') === null
    || localStorage.getItem('drinksData') === null) {
      fetchData();
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  const requestFoodsAndDrinksFromAPI = async () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const allMealsPromises = alphabet.split('').map(async (letter) => {
      const mealsResponse = await requestApi('meals', 'firstLetter', letter);
      if (mealsResponse.meals) {
        return DealResponse('meals', mealsResponse.meals);
      }
      return [];
    });
    const allMealsResults = await Promise.all(allMealsPromises);
    const allMeals = allMealsResults.flat();
    setFoodsData(allMeals);
    localStorage.setItem('foodsData', JSON.stringify(allMeals));

    const allDrinksPromises = alphabet.split('').map(async (letter) => {
      const drinksResponse = await requestApi('drinks', 'firstLetter', letter);
      if (drinksResponse.drinks) {
        return DealResponse('drinks', drinksResponse.drinks);
      }
      return [];
    });
    const allDrinksResults = await Promise.all(allDrinksPromises);
    const allDrinks = allDrinksResults.flat();
    setDrinksData(allDrinks);
    localStorage.setItem('drinksData', JSON.stringify(allDrinks));
  };

  const requestFoodsAndDrinksCategoriesFromAPI = async () => {
    const mealsResponse = await requestApi('meals', 'categories', '');
    if (mealsResponse.meals) {
      setFoodsCategories(mealsResponse.meals);
      localStorage.setItem('foodsCategories', JSON.stringify(mealsResponse.meals));
    }
    const drinksResponse = await requestApi('drinks', 'categories', '');
    if (drinksResponse.drinks) {
      setDrinksCategories(drinksResponse.drinks);
      localStorage.setItem('drinksCategories', JSON.stringify(drinksResponse.drinks));
    }
  };

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
