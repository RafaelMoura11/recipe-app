const searchAPIFromSearch = async (option, value, page) => {
  const objectOfUrl = {
    comidas: {
      Ingrediente: (ingrediente) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
      Nome: (nome) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`,
      'Primeira letra': (primeiraLetra) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`,
    },
    bebidas: {
      Ingrediente: (ingrediente) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
      Nome: (nome) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`,
      'Primeira letra': (primeiraLetra) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`,
    },
  };
  try {
    const apiResponse = await fetch(objectOfUrl[page][option](value));
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
    `${element[1]} - ${recipe[`strMeasure${i + 1}`]}`));
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
