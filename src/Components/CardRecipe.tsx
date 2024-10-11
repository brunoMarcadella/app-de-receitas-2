import { useContext, useState } from 'react';
import { CardRecipeProps } from '../Utils/Types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import StoreContext from '../Context/StoreContext';
import { shareIcon } from '../Utils/exportIcons';
import { ContainerImage, ContainerInfo,
  PrincipalContainer } from '../styles/StyledCardRecipe';

function CardRecipe({ food, page, index }: CardRecipeProps) {
  const { removeFavorites } = useContext(StoreContext);
  const [copied, setCopied] = useState(false);
  const { image, name, nationality, category, tags, doneDate, type, id } = food;
  const dataTest = `${index}-horizontal-`;
  const link = `http://app-de-receitas-trybe.vercel.app/${type}s/${id}`;

  const testIdName = (page === 'recipes') ? (`${index}-card-name`) : (`${dataTest}name`);
  const testIdImg = (page === 'recipes') ? (`${index}-card-img`) : (`${dataTest}image`);

  const copyToClipBoard = () => {
    console.log('Copied');

    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const handleFavorites = () => {
    removeFavorites(name);
    window.location.reload();
  };

  const share = (
    <img data-testid={ `${dataTest}share-btn` } src={ shareIcon } alt="share" />
  );
  const favBtn = (
    <button onClick={ () => handleFavorites() }>
      <img
        data-testid={ `${dataTest}favorite-btn` }
        src={ blackHeartIcon }
        alt="fav"
      />
    </button>
  );

  function renderCardRecipe() {
    return (
      <PrincipalContainer
        data-testid={ `${index}-recipe-card` }
      >
        <ContainerImage>

          <img
            src={ image }
            alt="food"
            data-testid={ testIdImg }
          />

        </ContainerImage>
        <div>
          <ContainerInfo className="Recipe-Info">

            <h1 data-testid={ testIdName }>{name}</h1>

            {(type === 'meal' && nationality !== undefined) && (
              <p data-testid={ `${dataTest}top-text` }>
                {`${nationality} - ${category}`}
              </p>
            )}
            {(type === 'drink' && food.alcoholicOrNot !== undefined) && (
              <p data-testid={ `${dataTest}top-text` }>{food.alcoholicOrNot}</p>
            )}

          </ContainerInfo>
          <div className="Done-Info">
            {(page === 'DoneRecipes') && (
              <p data-testid={ `${dataTest}done-date` }>
                {doneDate}
              </p>)}
          </div>
          {/* <div className="Tags">
            {(page === 'DoneRecipes' && tags.length > 0) && tags.map((tagName) => {
              const dataTestTag = `${index}-${tagName}-horizontal-tag`;
              return (
                <p key={ tagName } data-testid={ dataTestTag }>
                  {tagName}
                </p>
              );
            })}
          </div> */}
          {/* <div className="Done-Info">
            {(page === 'DoneRecipes') && (
              <p data-testid={ `${dataTest}done-date` }>
                {doneDate}
              </p>)}

            <div className="Tags">
              {(page === 'DoneRecipes') && tags.map((tagName) => {
                const dataTestTag = `${index}-${tagName}-horizontal-tag`;
                return (
                  <p key={ tagName } data-testid={ dataTestTag }>
                    {tagName}
                  </p>
                );
              })}
            </div>
          </div> */}
        </div>
        <button onClick={ () => copyToClipBoard() }>
          {copied ? 'Link copied!' : share}
        </button>
        {(page === 'Favorite') && (favBtn)}
      </PrincipalContainer>
    );
  }
  return renderCardRecipe();
}

export default CardRecipe;
