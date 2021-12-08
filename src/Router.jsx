import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Router() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/comidas"
        component={ Foods }
      />
      <Route
        exact
        path="/bebidas"
        component={ Drinks }
      />
      <Route
        exact
        path="/comidas/{id-da-receita}"
        component={ FoodRecipeDetails }
      />
      <Route
        exact
        path="//bebidas/{id-da-receita}"
        component={ DrinkRecipeDetails }
      />
      <Route
        exact
        path="//comidas/{id-da-receita}/in-progress"
        component={ FoodRecipeProcess }
      />
      <Route
        exact
        path="//bebidas/{id-da-receita}/in-progress"
        component={ DrinkRecipeProcess }
      />
      <Route
        exact
        path="/explorar"
        component={ Explore }
      />
      <Route
        exact
        path="/explorar/comidas"
        component={ ExploreFood }
      />
      <Route
        exact
        path="/explorar/bebidas"
        component={ ExploreDrinks }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredient }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreFoodByArea }
      />
      <Route
        exact
        path="/perfil"
        component={ Profile }
      />
      <Route
        exact
        path="/receitas-feitas"
        component={ RecipesMade }
      />
      <Route
        exact
        path="/receitas-favoritas"
        component={ FavoriteRecipes }
      />
    </Switch>
  );
}

export default Router;
