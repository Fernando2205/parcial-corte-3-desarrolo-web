/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formatea el número de Pokédex con ceros a la izquierda
 * @param {number} id - ID del Pokémon
 * @returns {string} ID formateado (ej: #001)
 */

export const formatPokedexNumber = (id) => {
  return `#${String(id).padStart(3, '0')}`
}

/**
 * Convierte decímetros a metros
 * @param {number} decimeters - Altura en decímetros
 * @returns {string} Altura en metros con formato
 */
export const formatHeight = (decimeters) => {
  const meters = decimeters / 10
  return `${meters.toFixed(1)} m`
}

/**
 * Convierte hectogramos a kilogramos
 * @param {number} hectograms - Peso en hectogramos
 * @returns {string} Peso en kilogramos con formato
 */
export const formatWeight = (hectograms) => {
  const kilograms = hectograms / 10
  return `${kilograms.toFixed(1)} kg`
}

/**
 * Obtiene los nombres de tipos de un Pokémon
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {Array<string>} Array de nombres de tipos
 */
export const getTypeNames = (types) => {
  if (!types || types.lenght === 0) return []
  return types.map(t => t.type.name)
}
