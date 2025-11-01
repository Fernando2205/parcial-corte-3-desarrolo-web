import { Html, useProgress } from '@react-three/drei'

/**
 * Componente de carga 3D con progreso real de texturas y modelos
 * Utiliza el hook useProgress de drei para monitorear el progreso real de carga
 * @returns {JSX.Element} Interfaz de carga con barra de progreso y detalles
 */
const LoadingFallback = () => {
  // Hook que detecta el progreso real de carga de recursos
  const { active, progress, errors, item, loaded, total } = useProgress()

  return (
    <Html center>
      <div className='flex flex-col items-center gap-6 p-8 bg-black/80 rounded-lg backdrop-blur-sm min-w-[400px]'>
        {/* Spinner animado */}
        <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400' />

        {/* Título principal */}
        <p className='text-white text-xl font-semibold'>
          Cargando modelos 3D...
        </p>

        {/* Barra de progreso real */}
        <div className='w-full'>
          <div className='w-full bg-gray-700 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-yellow-400 h-full transition-all duration-300 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className='text-yellow-400 text-center mt-2 font-mono text-sm'>
            {progress.toFixed(0)}%
          </p>
        </div>

        {/* Información detallada de carga */}
        <div className='text-gray-400 text-sm text-center space-y-1'>
          <p>
            Cargados: <span className='text-white font-mono'>{loaded}</span> /{' '}
            <span className='text-white font-mono'>{total}</span> recursos
          </p>
          {item && (
            <p className='text-xs truncate max-w-[350px] animate-pulse'>
              Cargando: {item}
            </p>
          )}
          {errors.length > 0 && (
            <p className='text-red-400 text-xs'>Errores: {errors.length}</p>
          )}
        </div>

        {/* Indicador de actividad */}
        {active && (
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
            <p className='text-green-400 text-xs'>Cargando...</p>
          </div>
        )}
      </div>
    </Html>
  )
}

export default LoadingFallback
