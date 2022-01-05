import React from 'react';
import IngredientCard from './IngredientCard';

export default function IngredientCards({ info, page }) {
  const DOZE = 12;
  const cards = info.map((item, index) => (
    (index < DOZE && (
      <IngredientCard
        key={ item.idIngredient }
        index={ index }
        { ...item }
        page={ page }
      />))
  ));
  console.log(info);

  return cards;
}
