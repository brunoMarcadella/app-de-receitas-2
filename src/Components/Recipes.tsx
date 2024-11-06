import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import {
  imagesIconsMeals, allFoodIcon,
  imagesIconsDrinks, drinkIcon,
} from '../Utils/exportIcons';
import { CategoriesContainer, FinalContainer, ImageContainer,
  TextContainer } from '../styles/StyledMealsAndDrinks';
import LoadingPage from './Loading';

export default function Recipes() {
  const {
    recipes,
    setLoadingPage,
    loadingPage,
    foodsCategories,
    drinksCategories,
    foodsData,
    drinksData,
  } = useContext(StoreContext);
  const [data, setData] = useState<FoodCardType[]>([]);
  const [cards, setCard] = useState<FoodCardType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [allIcon, setAllIcon] = useState(allFoodIcon);
  const [categoriesIcons, setCategoriesIcons] = useState<string[]>([]);
  const [type, setType] = useState<string>('');

  useEffect(() => {
    function findType() {
      const path = window.location.pathname.split('/')[1];
      setType(path);

      if (path === 'meals') {
        setCategories(foodsCategories);
        setData(foodsData);
        setCategoriesIcons(imagesIconsMeals);
        setAllIcon(allFoodIcon);
      } else {
        setCategories(drinksCategories);
        setData(drinksData);
        setCategoriesIcons(imagesIconsDrinks);
        setAllIcon(drinkIcon);
      }
    }
    setLoadingPage(true);
    findType();
    setLoadingPage(false);
  }, [
    drinksCategories,
    drinksData,
    foodsCategories,
    foodsData,
    setLoadingPage,
  ]);

  useEffect(() => {
    setCard(recipes);
  }, [recipes]);

  async function changeRecipes(category: string) {
    setLoadingPage(true);
    if (category !== categorySelected) {
      const response = await requestApi(type, 'category-data', category);
      const newRecipes = DealResponse(type, response[type]).slice(0, 12);

      if (newRecipes) {
        setCard(newRecipes);
        setCategorySelected(category);
      }
    } else {
      setCard(data);
      setCategorySelected('');
    }
    setLoadingPage(false);
  }

  const FilterCategories = (
    <CategoriesContainer>
      <button
        data-testid="All-category-filter"
        onClick={ () => setCard(data) }
      >
        <ImageContainer>
          <img src={ allIcon } alt="Button" />
        </ImageContainer>
        <TextContainer>All</TextContainer>
      </button>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => changeRecipes(strCategory) }
        >
          <ImageContainer>
            <img
              src={ categoriesIcons[index] }
              alt={ `Button-${categoriesIcons[index]}` }
            />
          </ImageContainer>
          <TextContainer>{strCategory}</TextContainer>
        </button>
      ))}
    </CategoriesContainer>
  );

  return (
    loadingPage ? <LoadingPage />
      : (
        <div>
          {FilterCategories}
          <FinalContainer>
            {cards.map((recipe, index) => (
              <div key={ index }>
                <Link to={ `/${type}/${recipe.id}` }>
                  <CardRecipe food={ recipe } page="recipes" index={ index } />
                </Link>
              </div>
            ))}
          </FinalContainer>
        </div>
      )
  );
}
