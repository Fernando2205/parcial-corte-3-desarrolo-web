import { Suspense } from 'react'
import PokemonCard3D from './PokemonCard3D'
import LoadingFallback from './LoadingFallback'
import { calculateCardPosition } from '../../utils/sceneHelpers'

/**
 * Grupo de tarjetas de Pokémon distribuidas en círculo
 * @param {Array} pokemonList - Lista de Pokémon a renderizar
 * @param {Object} selectedPokemon - Pokémon actualmente seleccionado
 * @param {Function} onPokemonSelect - Callback al seleccionar un Pokémon
 */
const PokemonCardsGroup = ({ pokemonList, selectedPokemon, onPokemonSelect }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <group>
        {pokemonList.map((pokemon, index) => (
          <PokemonCard3D
            key={pokemon.id}
            pokemon={pokemon}
            position={calculateCardPosition(index, pokemonList.length)}
            onClick={() => onPokemonSelect(pokemon)}
            isSelected={selectedPokemon?.id === pokemon.id}
          />
        ))}
      </group>
    </Suspense>
  )
}

export default PokemonCardsGroup
