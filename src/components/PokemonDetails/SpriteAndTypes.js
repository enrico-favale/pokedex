import React, { useState } from "react";
import SpriteWithGradient from "./SpriteWithGradient";

const SpriteAndTypes = ({ pokemon, typeColors }) => {
  return (
    <div className="text-center mt-4 lg:mt-0">
      <SpriteWithGradient
        title={pokemon.name + "-Sprite"}
        pokemon={pokemon}
        typeColors={typeColors}
      ></SpriteWithGradient>

      {/* Mostra i tipi del Pokémon sotto l'immagine assegnando un colore diverso a seconda del tipo */}
      {pokemon.types.map((type) => (
        <div
          key={type.type.name}
          className={`inline-block text-center align-bottom text-sm font-bold px-4 pt-1 rounded-full mr-2 mt-4`}
          style={{ backgroundColor: typeColors[type.type.name] }}
        >
          <span className="inline-block text-center align-bottom">
            {type.type.name.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpriteAndTypes;
