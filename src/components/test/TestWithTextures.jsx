import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import { Suspense } from 'react'
import * as THREE from 'three'
import { usePokemonData } from '../../hooks/usePokemonData'
import { SPRITE_SOURCES } from '../../constants/config'

/**
 * Tarjeta 3D simple con textura
 */
const SimpleCard = ({ pokemon, position }) => {
  const texture = useLoader(TextureLoader, SPRITE_SOURCES.HOME(pokemon.id))

  // Configurar textura
  if (texture) {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
  }

  return (
    <group position={position}>
      {/* Fondo de la tarjeta */}
      <mesh>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>

      {/* Imagen del Pokemon */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/**
 * Fallback mientras cargan las texturas
 */
const LoadingBox = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='yellow' wireframe />
    </mesh>
  )
}

/**
 * Componente de prueba con texturas
 */
const TestWithTextures = () => {
  const { pokemonList, loading, error } = usePokemonData(3)

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-900'>
        <p className='text-white text-xl'>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-900'>
        <p className='text-red-500 text-xl'>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='w-full h-screen bg-black'>
      <div className='absolute top-4 left-4 z-10 bg-white p-4 rounded'>
        <h2 className='font-bold'>Test con Texturas</h2>
        <p>Pokemon: {pokemonList.map(p => p.name).join(', ')}</p>
      </div>

      <Canvas>
        {/* Cámara */}
        <perspectiveCamera position={[0, 0, 8]} />

        {/* Controles */}
        <OrbitControls />

        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Tarjetas con texturas */}
        <Suspense fallback={<LoadingBox />}>
          {pokemonList.map((pokemon, index) => (
            <SimpleCard
              key={pokemon.id}
              pokemon={pokemon}
              position={[(index - 1) * 3, 0, 0]}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default TestWithTextures
