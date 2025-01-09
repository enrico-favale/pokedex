import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvolutionChain, fetchPokemonByIdOrName } from "../api/pokemon";

import BaseStats from "../components/PokemonDetails/BaseStats";
import SpriteAndTypes from "../components/PokemonDetails/SpriteAndTypes";
import Moves from "../components/PokemonDetails/Moves/Moves";
import EvolutionChain from "../components/PokemonDetails/EvolutionChain";

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

  useEffect(() => {
    const getPokemonDetails = async () => {
      const data = await fetchPokemonByIdOrName(name); // Recupera i dettagli del Pokémon
      setPokemon(data);
      setLoading(false);
    };

    getPokemonDetails();
  }, [name]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col border border-txt_secondary rounded-lg p-8 md:mx-20 lg:mx-32">
      <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row lg:justify-between gap-10">
        <div className="shrink w-full">
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-xl text-txt_secondary">#{pokemon.id}</p>

          <BaseStats key={pokemon.name + "-BaseStats"} pokemon={pokemon} />
        </div>

        <div className="w-30 h-30 sm:w-80 sm:h-80">
          <SpriteAndTypes
            key={pokemon.name + "-SpriteAndTypes"}
            pokemon={pokemon}
            typeColors={typeColors}
          />
        </div>
      </div>
      <EvolutionChain
        key={pokemon.name + "-EvolutionChain"}
        pokemon={pokemon}
        typeColors={typeColors}
      />
      <Moves
        key={pokemon.name + "-Moves"}
        pokemon={pokemon}
        typeColors={typeColors}
      />
    </div>
  );
};

export default PokemonDetail;
