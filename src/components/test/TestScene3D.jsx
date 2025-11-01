import { usePokemonData } from '../../hooks/usePokemonData'
import Scene from '../scene3d/Scene'
import ControlsOverlay from '../scene3d/ControlsOverlay'
import { LoadingScreen, ErrorScreen } from '../ui'

/**
 * Componente de prueba para validar la escena 3D
 */
const TestScene3D = () => {
  const {
    pokemonList,
    selectedPokemon,
    setSelectedPokemon,
    loading,
    error
  } = usePokemonData(3)

  // Estado de carga
  if (loading) {
    return <LoadingScreen message='Cargando escena 3D...' />
  }

  // Estado de error
  if (error) {
    return <ErrorScreen error={error} />
  }

  return (
    <div className='relative w-full h-screen'>
      {/* Escena 3D */}
      <Scene
        pokemonList={pokemonList}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={setSelectedPokemon}
      />

      {/* Controles */}
      <ControlsOverlay />

      {/* Pokemon seleccionado overlay */}
      {selectedPokemon && (
        <div className='absolute bottom-4 right-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm min-w-[250px]'>
          <h3 className='text-2xl font-bold mb-2 capitalize'>
            {selectedPokemon.name}
          </h3>
          <p className='text-gray-400 mb-2'>
            #{String(selectedPokemon.id).padStart(3, '0')}
          </p>
          <div className='flex gap-2 mb-3'>
            {selectedPokemon.types.map((type) => (
              <span
                key={type.type.name}
                className='px-3 py-1 rounded-full text-xs font-semibold uppercase'
                style={{
                  backgroundColor: type.type.name
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div>
              <p className='text-gray-400'>HP</p>
              <p className='font-bold'>{selectedPokemon.stats[0].base_stat}</p>
            </div>
            <div>
              <p className='text-gray-400'>ATK</p>
              <p className='font-bold'>{selectedPokemon.stats[1].base_stat}</p>
            </div>
            <div>
              <p className='text-gray-400'>DEF</p>
              <p className='font-bold'>{selectedPokemon.stats[2].base_stat}</p>
            </div>
            <div>
              <p className='text-gray-400'>SPD</p>
              <p className='font-bold'>{selectedPokemon.stats[5].base_stat}</p>
            </div>
          </div>
        </div>
      )}

      {/* Debug info */}
      <div className='absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm text-xs'>
        <p>Pokemon cargados: {pokemonList.length}</p>
        <p>Seleccionado: {selectedPokemon?.name || 'Ninguno'}</p>
        <p className='text-green-400 mt-2'>Escena 3D activa</p>
      </div>
    </div>
  )
}

export default TestScene3D
