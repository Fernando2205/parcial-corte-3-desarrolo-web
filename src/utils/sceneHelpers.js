/**
 * Utilidades para cálculos de la escena 3D
 */

/**
 * Calcula la posición de una tarjeta en un arreglo circular
 * @param {number} index - Índice de la tarjeta
 * @param {number} total - Total de tarjetas
 * @param {number} radius - Radio del círculo (por defecto 5)
 * @returns {Array<number>} Posición [x, y, z]
 */
export const calculateCardPosition = (index, total, radius = 5) => {
  // Si solo hay una tarjeta, colocarla en el centro
  if (total === 1) {
    return [0, 0, 0]
  }

  const angle = (index / total) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const y = 0
  return [x, y, z]
}
