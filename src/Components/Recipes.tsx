import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
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
    const loadData = () => {
      setLoadingPage(true);
      console.log('true');

      const path = window.location.pathname.split('/')[1];
      setType(path);

      if (path === 'meals') {
        setCategories(foodsCategories);
        setData(foodsData);
        setCategoriesIcons(imagesIconsMeals);
        setAllIcon(allFoodIcon);
        setCard(foodsData);
      } else {
        setCategories(drinksCategories);
        setData(drinksData);
        setCategoriesIcons(imagesIconsDrinks);
        setAllIcon(drinkIcon);
        setCard(drinksData);
      }
      console.log('false');

      setTimeout(() => {
        setLoadingPage(false);
      }, 500);
    };
    loadData();
  }, [
    drinksCategories,
    drinksData,
    foodsCategories,
    foodsData,
    setLoadingPage,
  ]);

  function changeRecipes(category: string) {
    setLoadingPage(true);
    if (category !== categorySelected) {
      const newRecipes = data.filter((recipe) => recipe.category === category);

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
