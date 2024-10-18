import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonByIdOrName } from '../api/pokemon';

const PokemonDetail = () => {
  const { name } = useParams();  // Prende il nome del Pokémon dalla URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetails = async () => {
      const data = await fetchPokemonByIdOrName(name);  // Recupera i dettagli del Pokémon
      setPokemon(data);
      setLoading(false);
    };

    getPokemonDetails();
    console.log(pokemon);
  }, [name]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="w-48 h-48" 
      />
      <p className="text-xl">Height: {pokemon.height}</p>
      <p className="text-xl">Weight: {pokemon.weight}</p>
      {/* Puoi aggiungere altre informazioni come le statistiche, tipi, ecc. */}
    </div>
  );
};

export default PokemonDetail;
