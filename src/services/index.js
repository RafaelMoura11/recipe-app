const searchAPIFromSearch = async (option, value) => {
  console.log(option);
  console.log(value);
  const objectOfUrl = {
    Ingrediente: (ingrediente) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
    Nome: (nome) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`,
    'Primeira letra': (primeiraLetra) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`,
  };
  try {
    const apiResponse = await fetch(objectOfUrl[option](value));
    const jsonResponse = await apiResponse.json();
    return jsonResponse;
  } catch (erro) {
    return (option === 'Primeira letra' && value.length > 1
      ? global.alert('Sua busca deve conter somente 1 (um) caracter')
      : global.alert(erro));
  }
};

export default searchAPIFromSearch;
