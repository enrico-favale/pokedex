import './App.css';
import Card from './components/Card';

import { useState, useEffect } from 'react';
import { fetchPokemonList, getIdFromUrl } from './api/pokemon';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const getPokemonList = async () => {
      const data = await fetchPokemonList(151); // Recupera i primi 151 Pokémon
      setPokemon(data);
      setLoading(false);
    };

    getPokemonList();
  }, []);

  const handlePokemonClick = async (identifier) => {
    // Apre scheda del pokemon con i dettagli
  };

  if (loading) return;

  return (

    <div className='font-mono bg-bg_main text-txt_main'>

      <header className='items-center flex justify-center p-6'>
        <img src='white-pokeball.png' alt='pokeball' className='' />
        <p className='text-5xl font-bold'>
          Pokedex
        </p>
      </header>

      <main className='container mx-auto px-4'>
        <div className='grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
          {pokemon.map((poke) => (
            <Card key={poke.name} pokemon={poke} />
          ))}
        </div>
      </main>

    </div>
  );
}

export default App;
