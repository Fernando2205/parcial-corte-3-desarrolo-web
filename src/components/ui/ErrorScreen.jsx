/**
 * Pantalla de error centralizada
 * @param {Object} props
 * @param {string} props.error - Mensaje de error a mostrar
 */
const ErrorScreen = ({ error }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-red-500 text-white p-6 rounded-lg max-w-md'>
        <h2 className='text-2xl font-bold mb-2'>Error</h2>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default ErrorScreen
