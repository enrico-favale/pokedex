/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'courier': ['"Courier New"', 'monospace'],
      },
      colors: {
        txt_main: "#ebebeb",
        txt_secondary: "#888888",
        bg_main: "#111111",

        // Colori ufficiali dei tipi di Pokémon
        normal_type: "#A8A77A",     // Normal
        fire_type: "#EE8130",       // Fire
        fighting_type: "#C22E28",   // Fighting
        water_type: "#6390F0",      // Water
        flying_type: "#A98FF3",     // Flying
        grass_type: "#7AC74C",      // Grass
        poison_type: "#A33EA1",     // Poison
        electric_type: "#F7D02C",   // Electric
        ground_type: "#E2BF65",     // Ground
        psychic_type: "#F95587",    // Psychic
        rock_type: "#B6A136",       // Rock
        ice_type: "#96D9D6",        // Ice
        bug_type: "#A6B91A",        // Bug
        dragon_type: "#6F35FC",     // Dragon
        ghost_type: "#735797",      // Ghost
        dark_type: "#705746",       // Dark
        steel_type: "#B7B7CE",      // Steel
        fairy_type: "#D685AD",      // Fairy
      },
    },
  },
  plugins: [],
}
