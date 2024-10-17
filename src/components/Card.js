import React, { useState } from 'react';
import { getIdFromUrl } from '../api/pokemon';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
  const id = getIdFromUrl(pokemon.url);
  const name = pokemon.name;
  const sprite_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const shiny_sprite_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;

  // Stato per gestire l'hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/pokemon/${name}`}>
      <div
        className='p-4 border-l-2 border-b-2 border-txt_secondary text-txt_secondary rounded-bl-lg transition-transform duration-300 cursor-pointer max-w-xs flex flex-col items-center hover:scale-105 hover:border-txt_main hover:text-txt_main'
        onMouseEnter={() => setIsHovered(true)}  // Imposta lo stato su true quando il mouse entra
        onMouseLeave={() => setIsHovered(false)} // Imposta lo stato su false quando il mouse esce
      >
        <div className='flex'>
          {/* Mostra l'immagine normale o shiny in base allo stato */}
          <img
            src={isHovered ? shiny_sprite_url : sprite_url} // Cambia l'immagine in base allo stato
            alt={name}
            className="w-20 h-20 mx-auto"
          />
        </div>

        <div className='flex items-center justify-center'>
          <span className='pr-2 w-12 text-center'>#{id}</span>
          <span className='text-lg font-bold capitalize'>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
