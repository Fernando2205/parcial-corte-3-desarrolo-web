export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
}

/**
 * Obtiene el color principal de un Pokémon basado en su tipo primario
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {string} Color hexadecimal
 */
export const getPokemonMainColor = (types) => {
  if (!types || types.length === 0) return TYPE_COLORS.normal
  return TYPE_COLORS[types[0].type.name] || TYPE_COLORS.normal
}

/**
 * Obtiene todos los colores de un Pokémon (si tiene más de un tipo)
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {Array<string>} Array de colores hexadecimales
 */
export const getPokemonColors = (types) => {
  if (!types || types.length === 0) return [TYPE_COLORS.normal]
  return types.map(t => TYPE_COLORS[t.type.name] || TYPE_COLORS.normal)
}
