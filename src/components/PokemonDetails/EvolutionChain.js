import React, { useEffect, useState } from "react";
import { fetchEvolutionChain } from "../../api/pokemon";
import SpriteAndTypes from "./SpriteAndTypes";

const EvolutionChain = ({ pokemon, typeColors }) => {
  // Stato per memorizzare la catena evolutiva e i dati dei Pokémon
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect per chiamare la funzione fetchEvolutionChain quando il componente viene montato
  useEffect(() => {
    const getEvolutionChain = async () => {
      const evoChain = await fetchEvolutionChain(pokemon);
      setEvolutionChain(evoChain); // Aggiorna lo stato con gli oggetti della catena evolutiva
      setLoading(false); // Imposta lo stato di caricamento su falso
    };

    getEvolutionChain();
  }, [pokemon]); // Effettua la chiamata ogni volta che il Pokémon cambia

  // Mostra un messaggio di caricamento se i dati non sono ancora stati ottenuti
  if (loading) {
    return <p>Loading evolution chain...</p>;
  }

  return (
    <div className="mt-4">
      <p className="text-2xl font-bold border-b border-txt_secondary mb-2">
        Evolution Chain
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-around gap-4">
        {evolutionChain.map((evoPokemon, index) => (
          <div className="w-30 h-30 sm:w-50 sm:w-50" key={index}>
              <SpriteAndTypes pokemon={evoPokemon} typeColors={typeColors} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
