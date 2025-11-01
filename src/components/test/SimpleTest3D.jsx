import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { usePokemonData } from '../../hooks/usePokemonData'
import { LoadingScreen, ErrorScreen } from '../ui'

/**
 * Componente de prueba simple para verificar que Three.js funciona
 */
const SimpleTest3D = () => {
  const { pokemonList, loading, error } = usePokemonData(3)

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} />
  }

  console.log('Pokemon loaded:', pokemonList)

  return (
    <div className='w-full h-screen bg-black'>
      <div className='absolute top-4 left-4 z-10 bg-white p-4 rounded'>
        <h2 className='font-bold'>Test Simple 3D</h2>
        <p>Pokemon cargados: {pokemonList.length}</p>
      </div>

      <Canvas>
        {/* Cámara */}
        <perspectiveCamera position={[0, 0, 5]} />

        {/* Controles */}
        <OrbitControls />

        {/* Luces */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Un cubo por cada Pokemon (sin texturas aún) */}
        {pokemonList.map((pokemon, index) => (
          <mesh key={pokemon.id} position={[(index - 1) * 2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={`hsl(${index * 120}, 70%, 50%)`} />
          </mesh>
        ))}
      </Canvas>
    </div>
  )
}

export default SimpleTest3D
