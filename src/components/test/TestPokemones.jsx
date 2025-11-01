import { usePokemonData } from '../../hooks/usePokemonData'
import { SPRITE_SOURCES } from '../../constants/config'
import { capitalize, formatPokedexNumber } from '../../utils/helpers'
import { getPokemonMainColor } from '../../constants/typeColors'
import { LoadingScreen, ErrorScreen } from '../ui'

/**
 * Componente de prueba para validar la carga de datos de PokeAPI
 */
const TestPokemones = () => {
  const { pokemonList, selectedPokemon, setSelectedPokemon, loading, error } = usePokemonData()

  // Estado de carga
  if (loading) {
    return <LoadingScreen message='Cargando Pokémon...' />
  }

  // Estado de error
  if (error) {
    return <ErrorScreen error={error} />
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white mb-2'>
            PokéCards 3D - Test
          </h1>
          <p className='text-gray-400'>
            {pokemonList.length} Pokémon cargados correctamente
          </p>
        </div>

        {/* Grid de Pokémon */}
        <div className='grid grid-cols-3 gap-6 mb-8'>
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => setSelectedPokemon(pokemon)}
              className={`
                bg-gray-800 rounded-xl p-4 cursor-pointer
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                ${selectedPokemon?.id === pokemon.id ? 'ring-4 ring-yellow-400' : ''}
              `}
              style={{
                borderTop: `4px solid ${getPokemonMainColor(pokemon.types)}`
              }}
            >
              {/* Imagen */}
              <div className='relative'>
                <img
                  src={SPRITE_SOURCES.HOME(pokemon.id)}
                  alt={pokemon.name}
                  className='w-full h-40 object-contain'
                  onError={(e) => {
                    e.target.src = SPRITE_SOURCES.OFFICIAL_ARTWORK(pokemon.id)
                  }}
                />
              </div>

              {/* Info */}
              <div className='text-center mt-2'>
                <p className='text-gray-400 text-sm'>
                  {formatPokedexNumber(pokemon.id)}
                </p>
                <h3 className='text-white text-xl font-bold'>
                  {capitalize(pokemon.name)}
                </h3>

                {/* Tipos */}
                <div className='flex gap-2 justify-center mt-2'>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className='px-3 py-1 rounded-full text-white text-xs font-semibold'
                      style={{
                        backgroundColor: getPokemonMainColor([type])
                      }}
                    >
                      {capitalize(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pokémon Seleccionado */}
        {selectedPokemon && (
          <div className='bg-gray-800 rounded-xl p-8 shadow-2xl'>
            <div className='flex gap-8 items-center'>
              {/* Imagen grande */}
              <div className='shrink-0'>
                <img
                  src={SPRITE_SOURCES.HOME(selectedPokemon.id)}
                  alt={selectedPokemon.name}
                  className='w-64 h-64 object-contain'
                  onError={(e) => {
                    e.target.src = SPRITE_SOURCES.OFFICIAL_ARTWORK(selectedPokemon.id)
                  }}
                />
              </div>

              {/* Detalles */}
              <div className='flex-1'>
                <p className='text-gray-400 text-lg mb-2'>
                  {formatPokedexNumber(selectedPokemon.id)}
                </p>
                <h2 className='text-white text-5xl font-bold mb-4'>
                  {capitalize(selectedPokemon.name)}
                </h2>

                {/* Tipos */}
                <div className='flex gap-3 mb-6'>
                  {selectedPokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className='px-4 py-2 rounded-full text-white font-semibold'
                      style={{
                        backgroundColor: getPokemonMainColor([type])
                      }}
                    >
                      {capitalize(type.type.name)}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className='grid grid-cols-3 gap-4'>
                  <div className='bg-gray-700 rounded-lg p-4'>
                    <p className='text-gray-400 text-sm'>HP</p>
                    <p className='text-white text-2xl font-bold'>
                      {selectedPokemon.stats[0].base_stat}
                    </p>
                  </div>
                  <div className='bg-gray-700 rounded-lg p-4'>
                    <p className='text-gray-400 text-sm'>Attack</p>
                    <p className='text-white text-2xl font-bold'>
                      {selectedPokemon.stats[1].base_stat}
                    </p>
                  </div>
                  <div className='bg-gray-700 rounded-lg p-4'>
                    <p className='text-gray-400 text-sm'>Defense</p>
                    <p className='text-white text-2xl font-bold'>
                      {selectedPokemon.stats[2].base_stat}
                    </p>
                  </div>
                </div>

                {/* Habilidades */}
                <div className='mt-6'>
                  <h3 className='text-gray-400 text-sm mb-2'>Habilidades</h3>
                  <div className='flex gap-2 flex-wrap'>
                    {selectedPokemon.abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className='bg-gray-700 text-white px-3 py-1 rounded-lg text-sm'
                      >
                        {capitalize(ability.ability.name.replace('-', ' '))}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className='mt-8 bg-gray-800 rounded-xl p-4'>
          <h3 className='text-white font-bold mb-2'>Debug Info</h3>
          <pre className='text-gray-400 text-xs overflow-auto'>
            {JSON.stringify(
              {
                totalPokemon: pokemonList.length,
                selectedId: selectedPokemon?.id,
                selectedName: selectedPokemon?.name,
                apiWorking: ' PokeAPI funciona correctamente',
                spritesWorking: ' Sprites de Pokémon HOME cargando'
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default TestPokemones
