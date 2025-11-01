/**
 * Pantalla de carga centralizada para estados de loading
 * @param {Object} props
 * @param {string} props.message - Mensaje personalizado de carga
 */
const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mx-auto mb-4' />
        <p className='text-white text-xl'>{message}</p>
      </div>
    </div>
  )
}

export default LoadingScreen
