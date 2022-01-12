const searchAPIFromSearch = async (option, value, page) => {
  const objectOfUrl = {
    comidas: {
      Ingrediente: () => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
      Nome: () => `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
      'Primeira letra': () => `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`,
    },
    bebidas: {
      Ingrediente: () => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`,
      Nome: () => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`,
      'Primeira letra': () => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`,
    },
  };
  try {
    const apiResponse = await fetch(objectOfUrl[page][option]());
    const jsonResponse = await apiResponse.json();
    return jsonResponse;
  } catch (erro) {
    return (option === 'Primeira letra' && value.length > 1
      ? global.alert('Sua busca deve conter somente 1 (um) caracter')
      : global.alert(erro));
  }
};

export default searchAPIFromSearch;

export const getAllIngredientsFromRecipe = (recipe) => {
  const allKeysAndValuesOfRecipe = Object.entries(recipe);
  const allIngredients = allKeysAndValuesOfRecipe.filter(([key, value]) => (
    key.includes('Ingredient') && value)).map((element, i) => (
    recipe[`strMeasure${i + 1}`] ? `${element[1]} - ${recipe[`strMeasure${i + 1}`]}`
      : `${element[1]}`));
  return allIngredients;
};

export const requestRecipeDetailsById = async (id, page) => {
  const objectOfUrl = {
    comidas: () => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    bebidas: () => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals ? meals[0] : drinks[0]);
};

export const requestRecommendedRecipes = async (page) => {
  const objectOfUrl = {
    comidas: () => 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    bebidas: () => 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};

export const getCategoriesByPage = async (page) => {
  const objectOfUrl = {
    comidas: () => 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    bebidas: () => 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};

export const getRecipesByCategory = async (page, category) => {
  const objectOfUrl = {
    comidas: () => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    bebidas: () => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};

export const defaultRecipes = async (page) => {
  const objectOfUrl = {
    bebidas: () => 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    comidas: () => 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};

export const randomRecipes = async (page) => {
  const objectOfUrl = {
    bebidas: () => 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    comidas: () => 'https://www.themealdb.com/api/json/v1/1/random.php',
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};

export const addIngredientInProgressRecipes = (id, ingredient, object, page) => {
  const objectOfKey = {
    comidas: 'meals',
    bebidas: 'cocktails',
  };
  const key = objectOfKey[page];
  const newArrayOfIngredients = [...object[key][id], ingredient];
  const newProgress = { ...object,
    [key]: { ...object[key],
      [id]: newArrayOfIngredients } };
  return newProgress;
};

export const removeIngredientInProgressRecipes = (id, ingredient, object, page) => {
  const objectOfKey = {
    comidas: 'meals',
    bebidas: 'cocktails',
  };
  const key = objectOfKey[page];
  const arrayOfIngredients = object[key][id];

  const newArrayOfIngredients = arrayOfIngredients.filter((element) => (
    element !== ingredient));
  const newProgress = { ...object,
    [key]: { ...object[key],
      [id]: newArrayOfIngredients } };
  return newProgress;
};

export const checkIngredientsInLocalStorage = (currentProgress, ingredient, id, page) => {
  const objectOfKey = {
    comidas: 'meals',
    bebidas: 'cocktails',
  };
  const key = objectOfKey[page];
  return currentProgress[key][id].includes(ingredient);
};

export const dateNow = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  return dataAtual;
};

export const checkRecipeInFavoriteRecipes = (recipeId, favoriteRecipes) => {
  if (favoriteRecipes) {
    return favoriteRecipes.some(({ id }) => recipeId === id);
  }
  return false;
};

export const addRecipeInFavoriteRecipes = (recipe, favoriteRecipes) => (
  [...favoriteRecipes, recipe]);

export const removeRecipeFromFavoriteRecipes = (recipeId, favoriteRecipes) => (
  favoriteRecipes.filter(({ id }) => id !== recipeId)
);

export const getIngredients = async (page) => {
  const objectOfUrl = {
    comidas: () => 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    bebidas: () => 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
  };
  const apiResponse = await fetch(objectOfUrl[page]());
  const { meals, drinks } = await apiResponse.json();
  return (meals || drinks);
};
