export type FoodCardType = {
  id:string
  type:string
  nationality:string
  category:string
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};

export type SmallFoodCardType = {
  id:string,
  type:string,
  name: string,
  image: string,
};

export type StorageType = {
  user: {
    email: string,
  },
  doneRecipes: FoodCardType[],
  favoriteRecipes: FoodCardType[],
  inProgressRecipes: {
    drinks: {
      id: number[]
    },
    meals: {
      id: number[]
    },
  },
};

export type StoreContextType = {
  handleFood : (page : string) => void,
  handleDoneRecipes : (filter : string) => void,
  handleFavorites: (filter : string) => void,
  handleScreen : (filter : string, string: FoodCardType[]) => void,
  storeRecipes : StorageType,
  food : string,
  recipesScreen: FoodCardType[],
  removeFavorites: (recipe : string) => void,
  recipes: FoodCardType[] | SmallFoodCardType[],
  handleRecipes: (newRecipes: FoodCardType[]) => void,
  showByDoneFilter: boolean,
  filteredDoneRecipes: FoodCardType[],
  showByFavFilter: boolean,
  filteredFavRecipes: FoodCardType[],
};

export type CardRecipe = {
  id: string,
  type: string,
  image: string,
  name: string,
  category: string,
  nationality: string,
  tags: string[],
  doneDate: string,
  instructions: string
  ingredients: string[],
  alcoholicOrNot: string,
};

export type CardRecipeProps = {
  food : FoodCardType
  page: string
  index: number
};

export type NavProps = {
  page: string;
};

export type CategoryType = {
  strCategory: string,
};

export interface RecipeDetailsProps {
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  strYoutube?: string;
  strAlcoholic?: string;
}
