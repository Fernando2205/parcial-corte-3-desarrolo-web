import { Text3D, Center } from '@react-three/drei'
import { capitalize } from '../../utils/helpers'

/**
 * Componente de texto 3D para nombres de Pokémon
 * @param {string} text - Texto a mostrar
 * @param {Array} position - Posición [x, y, z]
 * @param {string} color - Color del texto
 * @param {number} size - Tamaño del texto
 * @param {number} height - Profundidad de extrusión
 */
const CardText3D = ({
  text,
  position = [0, 0, 0],
  color = 'white',
  size = 0.2,
  height = 0.03
}) => {
  return (
    <Center position={position}>
      <Text3D
        font='/fonts/helvetiker_regular.typeface.json'
        size={size}
        height={height}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.005}
        bevelSize={0.002}
        bevelSegments={3}
      >
        {capitalize(text)}
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
        />
      </Text3D>
    </Center>
  )
}

export default CardText3D
