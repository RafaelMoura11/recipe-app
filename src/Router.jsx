import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodRecipeDetails from './pages/FoodRecipeDetails';
import DrinkRecipeDetails from './pages/DrinkRecipeDetails';
import FoodRecipeProcess from './pages/FoodRecipeProcess';
import DrinkRecipeProcess from './pages/DrinkRecipeProcess';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredient from './pages/ExploreFoodsByIngredient';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreFoodByArea from './pages/ExploreFoodByArea';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

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
        path="/comidas/:id"
        component={ FoodRecipeDetails }
      />
      <Route
        exact
        path="/bebidas/:id"
        component={ DrinkRecipeDetails }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodRecipeProcess }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
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
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Router;
