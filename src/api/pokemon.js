// Base URL per la PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch Pokémon con un limite specificato.
 * @param {number} limit - Numero di Pokémon da recuperare (es: 151 per la generazione 1).
 * @param {number} offset - L'offset per iniziare da un certo punto.
 * @returns {Promise<Array>} - Un array di Pokémon.
 */
export const fetchPokemonList = async (limit = 151, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      throw new Error('Errore nel recupero della lista di Pokémon');
    }

    const data = await response.json();
    return data.results; // Ritorna solo la lista di Pokémon

  } catch (error) {
    console.error(error);

    return [];
  }
};

/**
 * Estrapola l'id dall'URL del Pokémon.
 * @param {string} url - URL da cui estrarre l'ID.
 * @returns {number} - L'ID del Pokémon estratto dall'URL.
 */
export const getIdFromUrl = (url) => {
  const id = url.split("/")[6];  // Estrai l'ID dall'URL
  return Number(id);  // Restituisce l'ID come numero
};

/**
 * Fetch di un Pokémon specifico tramite nome o ID.
 * @param {string | number} identifier - Il nome o l'ID del Pokémon.
 * @returns {Promise<Object>} - Dettagli completi del Pokémon.
 */
export const fetchPokemonByIdOrName = async (identifier) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);

    if (!response.ok) {
      throw new Error('Errore nel recupero del Pokémon');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetch di informazioni specifiche su una mossa.
 * @param {string} moveName - Nome della mossa da cercare.
 * @returns {Promise<Object>} - Dettagli completi della mossa.
 */
export const fetchMoveInfo = async (moveName) => {
  try {
    const response = await fetch(`${BASE_URL}/move/${moveName}`);

    if (!response.ok) {
      throw new Error('Errore nel recupero della mossa');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Funzione per recuperare la catena evolutiva di un Pokémon con oggetti completi.
 * @param {Object} pokemon - L'oggetto Pokémon contenente i suoi dettagli.
 * @returns {Promise<Array>} - Un array con gli oggetti di tutti i Pokémon nella catena evolutiva.
 */
export const fetchEvolutionChain = async (pokemon) => {
  try {
    // Otteniamo l'URL della specie del Pokémon
    const speciesUrl = pokemon.species.url;

    // Recuperiamo i dettagli della specie del Pokémon per ottenere l'ID della catena evolutiva
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    // Recuperiamo l'URL della catena evolutiva
    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Recuperiamo i dettagli della catena evolutiva
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    // Funzione ricorsiva per raccogliere gli oggetti dei Pokémon nella catena evolutiva
    const evolutionObjects = [];
    
    const collectEvolutionObjects = async (evolutionChain) => {
      // Aggiungiamo l'oggetto del Pokémon alla lista
      const pokemonObject = await fetchPokemonByIdOrName(evolutionChain.species.name);
      if (pokemonObject) {
        evolutionObjects.push(pokemonObject);
      }

      // Se ci sono evoluzioni successive, raccogliamole ricorsivamente
      if (evolutionChain.evolves_to.length > 0) {
        for (const evolution of evolutionChain.evolves_to) {
          await collectEvolutionObjects(evolution);
        }
      }
    };

    // Iniziamo a raccogliere gli oggetti dalla catena evolutiva
    await collectEvolutionObjects(evolutionChainData.chain);

    // Restituiamo l'array con gli oggetti dei Pokémon nella catena evolutiva
    return evolutionObjects;

  } catch (error) {
    console.error('Errore nel recupero della catena evolutiva:', error);
    return null;
  }
};
