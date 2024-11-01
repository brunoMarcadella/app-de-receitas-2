import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeDetailsProps } from '../Utils/Types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { requestApi } from '../Utils/ApiRequest';
import Recommendations from '../Components/Recommendation';
import { ButtonContainer, ButtonStartContainer, CategoryContainer,
  IngredientsContainer, InstructionsContainer,
  TitleContainer, VideoContainer } from '../styles/StyledRecipeDetails';

import { shareIcon } from '../Utils/exportIcons';
import StoreContext from '../Context/StoreContext';
import LoadingDetails from '../Components/LoadingDetails';

function RecipeDetails() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsProps>({});
  const [doneRecipes, setDoneRecipes] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [favButton, setFavButton] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const { loadingPage, setLoadingPage } = useContext(StoreContext);

  useEffect(() => {
    const path = window.location.pathname;
    console.log('path: ', path);

    const newFood = path.split('/')[1];
    console.log('newFood: ', newFood);
    const newId = path.split('/')[2];
    console.log('newId: ', newId);
    const recipeDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const isRecipeDone = recipeDone.some((recipe: any) => recipe.id === newId);
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')
    || '{}');
    const isRecipeInProgress = recipesInProgress[newFood as string]?.[newId as string];

    const fetchRecipeDetails = async () => {
      if (newId !== undefined) {
        setLoadingPage(true);
        const response = requestApi(newFood, 'id', newId);
        const recipeData = await response;
        const recipeDetailData = recipeData[newFood];

        setRecipeDetails(recipeDetailData[0]);
        setLoadingPage(false);
        const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]));
        if (favoriteRecipesStorage.length > 0) {
          const findIsFavorite = favoriteRecipesStorage
            .some((favRecipe: any) => favRecipe.id === newId);
          if (findIsFavorite) {
            setFavButton(true);
          }
        }
      }
    };

    setDoneRecipes(isRecipeDone);
    setRecipeInProgress(!!isRecipeInProgress);
    fetchRecipeDetails();
  }, [setLoadingPage]);

  const recipeButton = () => {
    navigate(`/${type}/${id}/in-progress`);
  };

  const shareButton = () => {
    const recipeLink = window.location.href;

    navigator.clipboard.writeText(recipeLink)
      .then(() => {
        setCopyMessage('Link copied!');
      });
  };

  const favoriteButton = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]));

    if (favButton) {
      const updatedFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setFavButton(false);
    } else {
      favoriteRecipes.push({
        id,
        type: type === 'meals' ? 'meal' : 'drink',
        nationality: type === 'meals' ? recipeDetails.strArea : '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: type === 'drinks' ? recipeDetails.strAlcoholic : '',
        name: recipeDetails.strMeal || recipeDetails.strDrink,
        image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      });

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavButton(true);
    }
  };

  const Steps = recipeDetails.strInstructions?.split('\n')
    .map((Step, index) => (
      <p key={ index }>
        {`${Step}`}
        <br />
      </p>
    ));

  if (loadingPage) return <LoadingDetails />;
  return (
    <div>
      <CategoryContainer>
        <div>
          {type === 'meals' && (
            <>
              <p data-testid="recipe-category">
                {recipeDetails.strCategory}
              </p>
              <p>
                {recipeDetails.strArea}
              </p>
            </>
          )}
          {type === 'drinks' && (
            <p data-testid="recipe-category">
              {recipeDetails.strCategory}
              <br />
              {recipeDetails.strAlcoholic}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={ shareButton }
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt={ shareIcon } />
          </button>
          <div data-tesid="copy">{copyMessage}</div>
          <button
            onClick={ favoriteButton }
          >
            <img
              data-testid="favorite-btn"
              src={ favButton ? blackHeartIcon : whiteHeartIcon }
              alt={ favButton ? 'Favorited' : 'Unfavorited' }
            />
          </button>
        </div>
      </CategoryContainer>
      <TitleContainer>
        <h1 data-testid="recipe-title">
          {recipeDetails.strMeal || recipeDetails.strDrink}
        </h1>
        <img
          src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
          width="350px"
        />
      </TitleContainer>
      <IngredientsContainer>
        <h2>Ingredients</h2>
        <ul>
          {Object.entries(recipeDetails)
            .filter(([key, value]) => key.startsWith('strIngredient') && value)
            .map(([key, ingredient], index) => {
              const measureKey = `strMeasure${key.split('strIngredient')[1]}`;
              const measure = (recipeDetails as any)[measureKey];
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${ingredient}: ${measure}`}
                </li>
              );
            })}
        </ul>
      </IngredientsContainer>
      <InstructionsContainer>
        <h2>Instructions</h2>
        <div data-testid="instructions">{Steps}</div>
      </InstructionsContainer>
      {type === 'meals' && recipeDetails.strYoutube && (
        <VideoContainer>
          <h2 data-testid="video">Video</h2>
          <iframe
            title="Recipe Video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.slice(-11)}` }
            allowFullScreen
            data-testid="video"
          />
        </VideoContainer>
      )}
      <div>
        {type && (
          <div>
            <Recommendations type={ type } />
          </div>
        )}
      </div>
      <ButtonStartContainer>
        {!doneRecipes
      && (
        <ButtonContainer
          className="Start-Recipe"
          data-testid="start-recipe-btn"
          onClick={ recipeButton }
        >
          {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </ButtonContainer>)}
      </ButtonStartContainer>
    </div>
  );
}

export default RecipeDetails;
