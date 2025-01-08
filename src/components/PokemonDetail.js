import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonByIdOrName } from "../api/pokemon";

// Colori per i tipi di Pokémon
const typeColors = {
  normal: "#A8A77A",
  fire: "#F08030",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonDetail = () => {
  const { name } = useParams(); // Prende il nome del Pokémon dalla URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stato per gestire l'hover
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getPokemonDetails = async () => {
      const data = await fetchPokemonByIdOrName(name); // Recupera i dettagli del Pokémon
      setPokemon(data);
      setLoading(false);
    };

    getPokemonDetails();
  }, [name]);

  if (loading) return <p>Loading...</p>;

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
    <div className="flex flex-col border border-txt_secondary rounded-lg p-8 md:mx-20 lg:mx-32">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-20">

        <div className="shrink w-full">
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-xl text-txt_secondary">#{pokemon.id}</p>

          <div className="mt-4">
            <p className="text-2xl border-b border-txt_secondary mb-2">Base stats</p>
            <div className="max-w-full border-l border-txt_secondary px-2 gap-1">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="grid grid-cols-[minmax(180px,_auto)_minmax(30px,_auto)_1fr] justify-between mb-1 pr-2">
                  <p className="text-l">{stat.stat.name.toUpperCase()}:</p>
                  <p className="text-l border-r border-txt_secondary">{stat.base_stat}</p>
                  <div className="border border-txt_secondary ml-2 m-1 rounded" style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                </div>
              ))}
              <p className="border border-txt_secondary max-w-fit rounded p-1 mt-2">TOTAL: {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          {/* Contenitore dell'immagine con il bordo rotondo e il gradiente in base ai tipi del pokemon*/}
          <div
            className="w-60 h-60 p-1 text-center overflow-visible rounded-full"
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
              className="w-full mb-2 object-cover rounded-full bg-bg_main" // Assicurati che l'immagine copra l'intero contenitore
            />
          </div>

          {/* Mostra i tipi del Pokémon sotto l'immagine assegnando un colore diverso a seconda del tipo */}
          {pokemon.types.map((type) => (
            <div
              key={type.type.name}
              className={`inline-block text-center align-bottom text-sm font-bold px-4 pt-1 rounded-full mr-2 mt-4`}
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              <span className="inline-block text-center align-bottom">{type.type.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
