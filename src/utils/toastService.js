/**
 * Sistema de gestión de Toast notifications
 */
let toastId = 0
export const toastListeners = new Set()

/**
 * Muestra un toast con el mensaje y tipo especificado
 * @param {string} message - Mensaje a mostrar
 * @param {'error' | 'warning' | 'success'} type - Tipo de notificación
 * @param {number} duration - Duración en milisegundos
 * @returns {number} ID del toast creado
 */
export const showToast = (message, type = 'error', duration = 3000) => {
  const id = toastId++
  const toast = { id, message, type, duration }

  toastListeners.forEach(listener => listener(toast))

  return id
}
