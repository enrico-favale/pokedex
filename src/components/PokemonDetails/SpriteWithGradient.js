import React, { useState } from "react";

const SpriteWithGradient = ({ pokemon, typeColors }) => {
  // Stato per gestire l'hover
  const [isHovered, setIsHovered] = useState(false);

  // Mappa i colori in base ai tipi del Pokémon
  const pokeomn_types = pokemon.types.map((type) => type.type.name);
  const gradientColors =
    pokeomn_types.length === 1
      ? [typeColors[pokeomn_types[0]], typeColors[pokeomn_types[0]]] // Duplicati se un solo tipo
      : pokeomn_types.map((type) => typeColors[type]); // Altrimenti usa tutti i colori

  // Crea un gradiente lineare con i colori dei tipi
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors.join(", ")})`,
  };

  return (
    <div
      className="w-full h-full p-1 text-center overflow-visible rounded-full"
      style={gradientStyle} // Applica il gradiente e il border-radius
    >
      <img
        onMouseEnter={() => setIsHovered(true)} // Imposta lo stato su true quando il mouse entra
        onMouseLeave={() => setIsHovered(false)} // Imposta lo stato su false quando il mouse esce
        src={
          isHovered
            ? pokemon.sprites.back_default
            : pokemon.sprites.front_default
        } // Cambia l'immagine in base allo stato
        alt={pokemon.name}
        className="w-full object-cover rounded-full bg-bg_main" // Assicurati che l'immagine copra l'intero contenitore
      />
    </div>
  );
};

export default SpriteWithGradient;
