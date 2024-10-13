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
 * Fetch dettagli di un singolo Pokémon.
 * @param {string} url - URL del Pokémon o il nome/id.
 * @returns {Promise<Object>} - Dettagli completi del Pokémon.
 */
export const fetchPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Errore nel recupero dei dettagli del Pokémon');
    }
    const data = await response.json();
    return data; // Ritorna tutti i dettagli del Pokémon
  } catch (error) {
    console.error(error);
    return null;
  }
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
