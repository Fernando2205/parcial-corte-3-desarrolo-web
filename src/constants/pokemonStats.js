/**
 * Constantes relacionadas con las estadísticas de Pokémon
 */

/**
 * Valores máximos registrados para cada estadística en todos los Pokémon
 * Fuente: Bulbapedia - Base Stats
 */
export const MAX_STATS = {
  hp: 255, // Blissey
  attack: 181, // Mega Mewtwo X
  defense: 230, // Shuckle, Mega Steelix, Mega Aggron
  specialAttack: 194, // Mega Mewtwo Y
  specialDefense: 230, // Shuckle
  speed: 180 // Regieleki, Ninjask (pre-Gen 8)
}

/**
 * Nombres legibles de las estadísticas
 */
export const STAT_NAMES = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  specialAttack: 'SP.ATK',
  specialDefense: 'SP.DEF',
  speed: 'SPD'
}

/**
 * Índices de las estadísticas en el array stats de la PokeAPI
 */
export const STAT_INDICES = {
  hp: 0,
  attack: 1,
  defense: 2,
  specialAttack: 3,
  specialDefense: 4,
  speed: 5
}

/**
 * Colores para visualización de estadísticas en tarjetas 3D
 */
export const STAT_COLORS = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  speed: '#FA92B2'
}

/**
 * Calcula el porcentaje de una estadística respecto a su máximo
 * @param {number} value - Valor de la estadística
 * @param {string} statType - Tipo de estadística (hp, attack, defense, speed)
 * @returns {number} Porcentaje (0-100)
 */
export const getStatPercentage = (value, statType) => {
  const maxValue = MAX_STATS[statType]
  if (!maxValue) return 0
  return Math.min((value / maxValue) * 100, 100)
}
