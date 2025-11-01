import { useRef, useState, useCallback, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { SPRITE_SOURCES } from '../../constants/config'
import { getPokemonMainColor, TYPE_COLORS } from '../../constants/typeColors'
import { MAX_STATS, STAT_INDICES, STAT_NAMES } from '../../constants/pokemonStats'
import {
  getTypeNames,
  formatPokedexNumber,
  capitalize,
  formatHeight,
  formatWeight
} from '../../utils/helpers'
import TypeEmblem3D from './TypeEmblem3D'
import CardText3D from './CardText3D'

/**
 * Componente de tarjeta 3D profesional para un Pokémon
 */
const PokemonCard3D = ({
  pokemon,
  position = [0, 0, 0],
  onClick,
  isSelected = false
}) => {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Handler para errores de carga de textura
  const handleTextureError = useCallback((error) => {
    console.error(`Error loading texture for ${pokemon.name}:`, error)
  }, [pokemon.name])

  // Cargar textura del Pokémon
  const texture = useLoader(
    TextureLoader,
    SPRITE_SOURCES.HOME(pokemon.id),
    undefined,
    handleTextureError
  )

  // Configurar textura
  useMemo(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])

  // Datos memoizados
  const mainColor = useMemo(
    () => getPokemonMainColor(pokemon.types),
    [pokemon.types]
  )

  const typeNames = useMemo(
    () => getTypeNames(pokemon.types),
    [pokemon.types]
  )

  const pokedexNumber = useMemo(
    () => formatPokedexNumber(pokemon.id),
    [pokemon.id]
  )

  // Usar helpers para altura y peso
  const physicalInfo = useMemo(() => ({
    height: formatHeight(pokemon.height),
    weight: formatWeight(pokemon.weight)
  }), [pokemon.height, pokemon.weight])

  // Obtener todas las stats con formato profesional
  const stats = useMemo(() => [
    {
      name: STAT_NAMES.hp,
      value: pokemon.stats[STAT_INDICES.hp].base_stat,
      color: '#FF5959',
      max: MAX_STATS.hp
    },
    {
      name: STAT_NAMES.attack,
      value: pokemon.stats[STAT_INDICES.attack].base_stat,
      color: '#F5AC78',
      max: MAX_STATS.attack
    },
    {
      name: STAT_NAMES.defense,
      value: pokemon.stats[STAT_INDICES.defense].base_stat,
      color: '#FAE078',
      max: MAX_STATS.defense
    },
    {
      name: STAT_NAMES.speed,
      value: pokemon.stats[STAT_INDICES.speed].base_stat,
      color: '#FA92B2',
      max: MAX_STATS.speed
    }
  ], [pokemon.stats])

  // Handlers de eventos
  const handlePointerOver = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
  }, [])

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation()
    setHovered(false)
  }, [])

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    onClick?.()
  }, [onClick])

  // Animación
  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += delta * 0.3

    const targetScale = hovered || isSelected ? 1.2 : 1
    groupRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      0.1
    )

    const targetY = position[1] + (hovered ? 0.3 : 0) + (isSelected ? 0.5 : 0)
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Base de la tarjeta */}
      <RoundedBox
        args={[2.6, 4, 0.15]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.15}
          emissive={mainColor}
          emissiveIntensity={isSelected ? 0.5 : 0.2}
        />
      </RoundedBox>

      {/* Fondo interno */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.4, 3.8, 0.02]} />
        <meshStandardMaterial
          color='#ffffff'
          roughness={0.05}
        />
      </mesh>

      {/* Número de Pokédex en header */}
      <CardText3D
        text={pokedexNumber}
        position={[0, 1.5, 0.11]}
        color='#666666'
        size={0.14}
        height={0.03}
      />

      {/* Nombre del Pokémon */}
      <CardText3D
        text={pokemon.name}
        position={[0, 1.15, 0.11]}
        color='#2c2c2c'
        size={0.22}
        height={0.03}
      />

      {/* Imagen del Pokémon */}
      {texture && (
        <mesh position={[0, 0.35, 0.12]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Badges de tipos */}
      <group position={[0, -0.55, 0.11]}>
        {pokemon.types.map((type, index) => {
          const typeColor = TYPE_COLORS[type.type.name] || TYPE_COLORS.normal
          const xPos = pokemon.types.length === 1 ? 0 : (index === 0 ? -0.55 : 0.55)

          return (
            <group key={type.type.name} position={[xPos, 0, 0]}>
              {/* Badge con sombra */}
              <RoundedBox args={[0.95, 0.28, 0.03]} radius={0.05} smoothness={2}>
                <meshStandardMaterial
                  color={typeColor}
                  metalness={0.2}
                  roughness={0.4}
                />
              </RoundedBox>
              {/* Texto del tipo */}
              <Text
                position={[0, 0, 0.02]}
                fontSize={0.11}
                color='#ffffff'
                anchorX='center'
                anchorY='middle'
                fontWeight='bold'
              >
                {capitalize(type.type.name)}
              </Text>
            </group>
          )
        })}
      </group>

      {/* Panel de información física */}
      <group position={[0, -0.9, 0.11]}>
        {/* Altura */}
        <group position={[-0.55, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 0.22, 0.01]} />
            <meshStandardMaterial color='#f0f0f0' />
          </mesh>
          <Text
            position={[-0.3, 0, 0.01]}
            fontSize={0.08}
            color='#666666'
            anchorX='left'
            anchorY='middle'
          >
            Height
          </Text>
          <Text
            position={[0.3, 0, 0.01]}
            fontSize={0.09}
            color='#333333'
            anchorX='right'
            anchorY='middle'
            fontWeight='bold'
          >
            {physicalInfo.height}
          </Text>
        </group>

        {/* Peso */}
        <group position={[0.55, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 0.22, 0.01]} />
            <meshStandardMaterial color='#f0f0f0' />
          </mesh>
          <Text
            position={[-0.3, 0, 0.01]}
            fontSize={0.08}
            color='#666666'
            anchorX='left'
            anchorY='middle'
          >
            Weight
          </Text>
          <Text
            position={[0.3, 0, 0.01]}
            fontSize={0.09}
            color='#333333'
            anchorX='right'
            anchorY='middle'
            fontWeight='bold'
          >
            {physicalInfo.weight}
          </Text>
        </group>
      </group>

      {/* Panel de Stats */}
      <group position={[0, -1.35, 0.11]}>
        {stats.map((stat, index) => {
          const yPos = 0.15 - (index * 0.15)
          const percentage = stat.value / stat.max
          const barWidth = 1.6

          return (
            <group key={stat.name} position={[0, yPos, 0]}>
              {/* Label de stat */}
              <Text
                position={[-1, 0, 0]}
                fontSize={0.09}
                color='#555555'
                anchorX='left'
                anchorY='middle'
                fontWeight='bold'
              >
                {stat.name}
              </Text>

              {/* Barra de fondo */}
              <mesh position={[0, 0, -0.005]}>
                <boxGeometry args={[barWidth, 0.1, 0.01]} />
                <meshStandardMaterial color='#e0e0e0' />
              </mesh>

              {/* Barra de progreso */}
              <mesh position={[-(barWidth / 2) + (barWidth * percentage / 2), 0, 0]}>
                <boxGeometry args={[barWidth * percentage, 0.1, 0.015]} />
                <meshStandardMaterial
                  color={stat.color}
                  emissive={stat.color}
                  emissiveIntensity={0.2}
                />
              </mesh>

              {/* Valor numérico */}
              <Text
                position={[0.85, 0, 0.01]}
                fontSize={0.08}
                color='#333333'
                anchorX='left'
                anchorY='middle'
                fontWeight='bold'
              >
                {stat.value}
              </Text>
            </group>
          )
        })}
      </group>

      {/* Emblema 3D del tipo PRINCIPAL */}
      <TypeEmblem3D
        type={typeNames[0]}
        position={[-1, 1.4, 0.3]}
        rotationSpeed={1.5}
      />

      {/* Indicador de selección */}
      {isSelected && (
        <group>
          {/* Aro dorado giratorio */}
          <mesh position={[0, -2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.08, 16, 100]} />
            <meshStandardMaterial
              color='#FFD700'
              emissive='#FFD700'
              emissiveIntensity={1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Partículas brillantes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 1.6,
                  -2.4,
                  Math.sin(angle) * 1.6
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial
                  color='#FFD700'
                  emissive='#FFD700'
                  emissiveIntensity={1.5}
                />
              </mesh>
            )
          })}
        </group>
      )}

      {/* Luz dinámica */}
      <pointLight
        position={[0, 0, 2.5]}
        intensity={hovered ? 2 : 0.8}
        distance={7}
        color={mainColor}
        decay={2}
      />
    </group>
  )
}

export default PokemonCard3D
