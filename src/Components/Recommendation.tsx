import { useEffect, useState } from 'react';
import './Recommendation.css';
import { RecomendedCards, RecomendedContainer } from '../styles/StyledRecipeDetails';

// Precisa de estilização na tag 'a' para que fique com o mesmo estilo dos cards
interface Props {
  type: string;
}

interface Recipe {
  idDrink: string;
  idMeal: string;
  strDrink: string;
  strMeal: string;
  strDrinkThumb: string;
  strMealThumb: string;
}

function Recommendations({ type }: Props) {
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const path = window.location.pathname;

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const responseSearch = await fetch(
          type === 'meals'
            ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
            : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );

        const dataSearch = await responseSearch.json();

        setRecommendations(dataSearch.meals || dataSearch.drinks);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecommendation();
  }, [type, path]);

  const link = (type === 'meals') ? 'drinks' : 'meals';

  return (
    <RecomendedContainer className="recommendation-card-container">
      <p>Recommendations</p>
      <RecomendedCards className="recommendation-cards">
        {recommendations.slice(0, 6).map((recipe, index1) => (
          <a
            href={ `/${link}/${recipe.idDrink || recipe.idMeal}` }
            key={ recipe.idDrink || recipe.idMeal }
            className="recommendation-card"
            data-testid={ `${index1}-recommendation-card` }
          >
            <img
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt={ recipe.strDrink || recipe.strMeal }
              width="150px"
            />
            <p data-testid={ `${index1}-recommendation-title` }>
              {recipe.strDrink || recipe.strMeal}
            </p>
          </a>
        ))}
      </RecomendedCards>
    </RecomendedContainer>
  );
}

export default Recommendations;
