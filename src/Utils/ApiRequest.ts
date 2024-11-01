const createUrlFood = (type: string, action : string, input : string) => {
  const url = (type === 'drinks') ? (
    'https://www.thecocktaildb.com/api/json/v1/1/') : (
    'https://www.themealdb.com/api/json/v1/1/');
    // random.php
  switch (action) {
    case 'firstLetter':
    {
      const newUrl = `${url}search.php?f=${input}`;
      return newUrl;
    }
    case 'ingredient':
    {
      const newUrl = `${url}filter.php?i=${input}`;
      return newUrl;
    }
    case 'categories':
    {
      const newUrl = `${url}list.php?c=list`;
      return newUrl;
    }
    case 'id':
    {
      const newUrl = `${url}lookup.php?i=${input}`;
      return newUrl;
    }
    case 'category-data':
    {
      const newUrl = `${url}filter.php?c=${input}`;
      return newUrl;
    }
    case 'random':
    {
      const newUrl = `${url}random.php`;
      return newUrl;
    }
    default:
    {
      const newUrl = (type === 'drinks')
        ? (`${url}filter.php?a=Alcoholic`)
        : (`${url}search.php?s=${input}`);
      return newUrl;
    }
  }
};

export const requestApi = async (type: string, action : string, input : string) => {
  const url = createUrlFood(type, action, input);
  console.log(url);

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
