import "./App.css";
import Card from "./components/Card";
import PokemonDetail from "./views/PokemonDetail";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPokemonList } from "./api/pokemon";

function App() {
  const BASENAME = process.env.PUBLIC_URL;

  const [pokemon, setPokemon] = useState([]); // Stato per la lista completa dei Pokémons
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Stato per la lista filtrata
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la query di ricerca

  useEffect(() => {
    const getPokemonList = async () => {
      const data = await fetchPokemonList(151); // Recupera i primi 151 Pokémon
      setPokemon(data);
      setFilteredPokemon(data); // Imposta la lista filtrata inizialmente uguale a tutti i Pokémon
      setLoading(false);
    };

    getPokemonList();
  }, []);

  // Funzione per gestire la ricerca
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtra i Pokémon in base alla query
    const filtered = pokemon.filter(
      (poke) => poke.name.toLowerCase().includes(query) // Confronta il nome del Pokémon con la query
    );
    setFilteredPokemon(filtered); // Aggiorna lo stato con i Pokémon filtrati
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Router basename={BASENAME}>
      <div className="font-mono bg-bg_main text-txt_main min-h-screen">
        <header className="flex flex-col items-center justify-center p-10">
          <p className="text-4xl font-bold">
            <Link className="flex flex-col items-center justify-center" to="/">
              Pokédex
              <img src={`${BASENAME}/white-pokeball.png`} alt="pokeball" />
            </Link>
          </p>
        </header>

        <main className="container mx-auto px-4">
          {/* Definiamo le rotte qui */}
          <Routes>
            {/* Rotta per la lista principale di Pokémon */}
            <Route
              path="/"
              element={
                <>
                  {/* Barra di ricerca */}
                  <div className="mb-8 flex justify-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search for a Pokemon..."
                      className="w-full max-w-lg px-2 py-1 text-center border-b-2 border-txt_secondary bg-inherit focus:outline-none focus:border-txt_main focus:text-txt_main"
                    />
                  </div>

                  <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {filteredPokemon.length > 0 ? (
                      filteredPokemon.map((poke) => (
                        <Card key={poke.name} pokemon={poke} />
                      ))
                    ) : (
                      <p className="text-center sm:col-span-2 md:col-span-2 lg:col-start-2 lg:col-span-2">
                        No Pokémon found
                      </p> // Mostra un messaggio se nessun Pokémon corrisponde alla ricerca
                    )}
                  </div>
                </>
              }
            />

            {/* Rotta per la pagina dettagliata del Pokémon */}
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
