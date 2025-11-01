/**
 * Configuraciones de emblemas 3D mejorados para cada tipo de Pokémon
 * Cada función retorna el JSX del emblema específico con más detalle
 * @param {string} color - Color del tipo de Pokémon
 */

export const fireEmblem = (color) => (
  <>
    {/* Llama principal */}
    <mesh position={[0, -0.05, 0]} castShadow>
      <coneGeometry args={[0.28, 0.6, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.2}
        roughness={0.3}
      />
    </mesh>
    {/* Llama media - naranja */}
    <mesh position={[0, 0.18, 0]} castShadow>
      <coneGeometry args={[0.2, 0.45, 12]} />
      <meshStandardMaterial
        color='#FF8C00'
        emissive='#FF8C00'
        emissiveIntensity={1}
      />
    </mesh>
    {/* Llama superior - amarilla */}
    <mesh position={[0, 0.38, 0]} castShadow>
      <coneGeometry args={[0.12, 0.28, 12]} />
      <meshStandardMaterial
        color='#FFD700'
        emissive='#FFD700'
        emissiveIntensity={1.5}
      />
    </mesh>
    {/* Chispas alrededor */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.25,
            0.1 + Math.sin(angle) * 0.1,
            Math.sin(angle) * 0.25
          ]}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color='#FFD700'
            emissive='#FFD700'
            emissiveIntensity={2}
          />
        </mesh>
      )
    })}
    {/* Base de fuego */}
    <mesh position={[0, -0.3, 0]}>
      <cylinderGeometry args={[0.15, 0.2, 0.1, 16]} />
      <meshStandardMaterial
        color='#8B0000'
        emissive='#FF4500'
        emissiveIntensity={0.5}
      />
    </mesh>
  </>
)

export const waterEmblem = (color) => (
  <>
    {/* Gota principal con detalle */}
    <mesh position={[0, 0.15, 0]} castShadow>
      <sphereGeometry args={[0.28, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0}
        roughness={0.05}
        transmission={0.95}
        thickness={0.8}
        ior={1.33}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
    {/* Punta de la gota */}
    <mesh position={[0, -0.22, 0]} rotation={[0, 0, Math.PI]} castShadow>
      <coneGeometry args={[0.18, 0.35, 16]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0}
        roughness={0.05}
        transmission={0.95}
        thickness={0.8}
        ior={1.33}
      />
    </mesh>
    {/* Burbujas internas */}
    {[0, 1, 2].map((i) => (
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 0.15,
          0.1 - i * 0.08,
          (Math.random() - 0.5) * 0.15
        ]}
      >
        <sphereGeometry args={[0.04 - i * 0.01, 16, 16]} />
        <meshPhysicalMaterial
          color='#ffffff'
          metalness={0}
          roughness={0}
          transmission={0.7}
          opacity={0.5}
          transparent
        />
      </mesh>
    ))}
    {/* Ondas en la base */}
    {[0, 1].map((i) => (
      <mesh key={i} position={[0, -0.4 - i * 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15 + i * 0.08, 0.02, 8, 24]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6 - i * 0.2}
        />
      </mesh>
    ))}
  </>
)

export const grassEmblem = (color) => (
  <>
    {/* Hoja central grande con nervadura */}
    <group rotation={[0, 0, -Math.PI / 6]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.55, 0.03]} />
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
      {/* Nervadura central */}
      <mesh position={[0, 0, 0.016]}>
        <boxGeometry args={[0.04, 0.55, 0.01]} />
        <meshStandardMaterial
          color='#4a7c3e'
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
    </group>
    {/* Hojas laterales */}
    {[-1, 1].map((side) => (
      <group key={side} rotation={[0, 0, side * Math.PI / 4]}>
        <mesh position={[side * 0.12, 0.18, 0]} castShadow>
          <boxGeometry args={[0.09, 0.35, 0.03]} />
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[side * 0.12, 0.18, 0.016]}>
          <boxGeometry args={[0.03, 0.35, 0.01]} />
          <meshStandardMaterial
            color='#4a7c3e'
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>
      </group>
    ))}
    {/* Tallo */}
    <mesh position={[0, -0.25, 0]} castShadow>
      <cylinderGeometry args={[0.03, 0.04, 0.15, 12]} />
      <meshStandardMaterial
        color='#5d8a4f'
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  </>
)

export const electricEmblem = (color) => (
  <>
    {/* Rayo con más segmentos y brillo */}
    <group>
      {/* Segmento superior */}
      <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      {/* Segmento medio derecha */}
      <mesh position={[0.13, 0.05, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      {/* Segmento inferior */}
      <mesh position={[0.02, -0.22, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
    {/* Chispas eléctricas */}
    {[0, 1, 2, 3, 4].map((i) => (
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.2
        ]}
      >
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial
          color='#FFFF00'
          emissive='#FFFF00'
          emissiveIntensity={2}
        />
      </mesh>
    ))}
  </>
)

export const iceEmblem = (color) => (
  <>
    {/* Cristal central */}
    <mesh castShadow>
      <octahedronGeometry args={[0.32, 1]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.2}
        roughness={0.05}
        transmission={0.85}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        ior={1.31}
      />
    </mesh>
    {/* Rayos de cristal (6 direcciones) */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <mesh
        key={i}
        rotation={[0, 0, (i * Math.PI) / 3]}
        position={[0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.55, 0.06, 0.06]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.2}
          roughness={0.05}
          transmission={0.8}
          clearcoat={1}
        />
      </mesh>
    ))}
    {/* Cristales pequeños en las puntas */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i * Math.PI) / 3
      return (
        <mesh
          key={`tip-${i}`}
          position={[Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0]}
        >
          <octahedronGeometry args={[0.05, 0]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.3}
            roughness={0.1}
            transmission={0.7}
          />
        </mesh>
      )
    })}
  </>
)

export const poisonEmblem = (color) => (
  <>
    {/* Burbuja principal grande */}
    <mesh position={[0, 0, 0]} castShadow>
      <sphereGeometry args={[0.28, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.2}
        transmission={0.5}
        thickness={0.3}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </mesh>
    {/* Burbujas medianas */}
    {[
      { pos: [0.18, 0.22, 0], size: 0.16 },
      { pos: [-0.2, 0.18, 0], size: 0.14 }
    ].map((bubble, i) => (
      <mesh key={i} position={bubble.pos} castShadow>
        <sphereGeometry args={[bubble.size, 24, 24]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.2}
          transmission={0.5}
          thickness={0.3}
          clearcoat={0.8}
        />
      </mesh>
    ))}
    {/* Burbujas pequeñas */}
    {[0, 1, 2, 3].map((i) => (
      <mesh
        key={`small-${i}`}
        position={[
          (Math.random() - 0.5) * 0.35,
          0.25 + Math.random() * 0.15,
          (Math.random() - 0.5) * 0.2
        ]}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.2}
          transmission={0.6}
          clearcoat={0.9}
        />
      </mesh>
    ))}
    {/* Reflejos en las burbujas */}
    <mesh position={[-0.08, 0.12, 0.15]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color='#ffffff'
        transparent
        opacity={0.7}
      />
    </mesh>
  </>
)

export const groundEmblem = (color) => (
  <>
    {/* Montículo principal */}
    <mesh position={[0, -0.08, 0]} castShadow>
      <coneGeometry args={[0.38, 0.5, 8]} />
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.95}
      />
    </mesh>
    {/* Rocas en el montículo */}
    {[
      { pos: [0.15, -0.12, 0.12], size: 0.12, rot: [0.3, 0.2, 0.4] },
      { pos: [-0.18, -0.15, -0.1], size: 0.1, rot: [0.5, 0.3, 0.2] },
      { pos: [0.08, 0.05, 0.15], size: 0.08, rot: [0.2, 0.5, 0.3] },
      { pos: [-0.12, 0, -0.12], size: 0.09, rot: [0.4, 0.1, 0.5] }
    ].map((rock, i) => (
      <mesh key={i} position={rock.pos} rotation={rock.rot} castShadow>
        <dodecahedronGeometry args={[rock.size, 0]} />
        <meshStandardMaterial
          color='#8B7355'
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>
    ))}
    {/* Base plana */}
    <mesh position={[0, -0.32, 0]}>
      <cylinderGeometry args={[0.35, 0.4, 0.08, 16]} />
      <meshStandardMaterial
        color='#6B5A3E'
        metalness={0}
        roughness={1}
      />
    </mesh>
  </>
)

export const rockEmblem = (color) => (
  <>
    {/* Formación de rocas con más detalle */}
    {/* Roca central grande */}
    <mesh position={[0, 0.05, 0]} rotation={[0.3, 0.4, 0.2]} castShadow>
      <dodecahedronGeometry args={[0.28, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.85}
      />
    </mesh>
    {/* Rocas alrededor */}
    {[
      { pos: [0.2, -0.08, 0.1], size: 0.16, rot: [0.5, 0.3, 0.4] },
      { pos: [-0.2, -0.12, 0], size: 0.14, rot: [0.4, 0.6, 0.2] },
      { pos: [0.08, -0.18, -0.15], size: 0.12, rot: [0.2, 0.4, 0.5] },
      { pos: [-0.12, 0.15, 0.1], size: 0.1, rot: [0.6, 0.2, 0.3] }
    ].map((rock, i) => (
      <mesh key={i} position={rock.pos} rotation={rock.rot} castShadow>
        <dodecahedronGeometry args={[rock.size, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.9}
        />
      </mesh>
    ))}
    {/* Fragmentos pequeños */}
    {[0, 1, 2, 3, 4].map((i) => (
      <mesh
        key={`frag-${i}`}
        position={[
          (Math.random() - 0.5) * 0.4,
          -0.25 + Math.random() * 0.1,
          (Math.random() - 0.5) * 0.4
        ]}
        rotation={[Math.random(), Math.random(), Math.random()]}
      >
        <dodecahedronGeometry args={[0.04, 0]} />
        <meshStandardMaterial
          color='#9d8c6b'
          metalness={0.2}
          roughness={0.95}
        />
      </mesh>
    ))}
  </>
)

export const bugEmblem = (color) => (
  <>
    {/* Cabeza del insecto */}
    <mesh position={[0, 0.22, 0]} castShadow>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
    {/* Antenas */}
    {[-1, 1].map((side) => (
      <group key={`antenna-${side}`}>
        <mesh
          position={[side * 0.08, 0.32, 0]}
          rotation={[0, 0, side * Math.PI / 6]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
          <meshStandardMaterial
            color='#4a4a4a'
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[side * 0.15, 0.42, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial
            color='#2a2a2a'
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
    ))}
    {/* Tórax */}
    <mesh position={[0, 0, 0]} castShadow>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
    {/* Abdomen segmentado */}
    {[0, 1, 2].map((i) => (
      <mesh key={`segment-${i}`} position={[0, -0.15 - i * 0.12, 0]} castShadow>
        <sphereGeometry args={[0.14 - i * 0.02, 12, 12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    ))}
    {/* Patas (6 patas) */}
    {[0, 1, 2].map((i) => {
      return [-1, 1].map((side) => (
        <group key={`leg-${i}-${side}`}>
          <mesh
            position={[side * 0.15, 0.1 - i * 0.15, 0]}
            rotation={[0, 0, side * (Math.PI / 2.5 + i * 0.2)]}
          >
            <cylinderGeometry args={[0.015, 0.02, 0.25, 8]} />
            <meshStandardMaterial
              color='#3a3a3a'
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))
    })}
    {/* Alas translúcidas */}
    {[-1, 1].map((side) => (
      <mesh
        key={`wing-${side}`}
        position={[side * 0.12, 0.05, 0.08]}
        rotation={[0, side * Math.PI / 4, side * Math.PI / 6]}
        castShadow
      >
        <boxGeometry args={[0.08, 0.28, 0.01]} />
        <meshPhysicalMaterial
          color='#ffffff'
          metalness={0.1}
          roughness={0.1}
          transmission={0.6}
          opacity={0.4}
          transparent
        />
      </mesh>
    ))}
  </>
)

export const flyingEmblem = (color) => (
  <>
    {/* Alas grandes y detalladas */}
    {[-1, 1].map((side) => (
      <group key={`wing-${side}`}>
        {/* Ala principal */}
        <mesh
          position={[side * 0.25, 0.08, 0]}
          rotation={[0, 0, side * Math.PI / 4]}
          castShadow
        >
          <boxGeometry args={[0.12, 0.5, 0.04]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Plumas superiores */}
        <mesh
          position={[side * 0.32, 0.3, 0]}
          rotation={[0, 0, side * Math.PI / 3.5]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.35, 0.03]} />
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Plumas inferiores */}
        <mesh
          position={[side * 0.3, -0.15, 0]}
          rotation={[0, 0, side * Math.PI / 5]}
          castShadow
        >
          <boxGeometry args={[0.08, 0.28, 0.03]} />
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
      </group>
    ))}
    {/* Cuerpo central */}
    <mesh position={[0, 0, 0]} castShadow>
      <capsuleGeometry args={[0.08, 0.22, 8, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
    {/* Plumas en la cola */}
    {[-0.08, 0, 0.08].map((x, i) => (
      <mesh
        key={`tail-${i}`}
        position={[x, -0.25, 0]}
        rotation={[0, 0, x * 0.3]}
        castShadow
      >
        <boxGeometry args={[0.05, 0.18, 0.02]} />
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
    ))}
  </>
)

export const psychicEmblem = (color) => (
  <>
    {/* Anillos concéntricos giratorios */}
    <mesh castShadow>
      <torusGeometry args={[0.3, 0.05, 16, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
    <mesh rotation={[Math.PI / 3, 0, 0]} castShadow>
      <torusGeometry args={[0.25, 0.045, 16, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
    <mesh rotation={[Math.PI / 3, Math.PI / 3, 0]} castShadow>
      <torusGeometry args={[0.2, 0.04, 16, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
    {/* Esfera central brillante */}
    <mesh>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial
        color='#ffffff'
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.2}
        roughness={0.1}
      />
    </mesh>
    {/* Partículas de energía */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.35,
            Math.sin(angle) * 0.35,
            0
          ]}
        >
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      )
    })}
  </>
)

export const fightingEmblem = (color) => (
  <>
    {/* Puño cerrado más detallado */}
    {/* Base de la mano */}
    <mesh position={[0, -0.08, 0]} castShadow>
      <boxGeometry args={[0.32, 0.35, 0.28]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
    {/* Pulgar */}
    <mesh position={[-0.18, -0.05, 0.1]} rotation={[0, 0, -Math.PI / 6]} castShadow>
      <boxGeometry args={[0.12, 0.22, 0.14]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
    {/* Dedos superiores (4 dedos) */}
    {[0, 1, 2, 3].map((i) => (
      <mesh
        key={i}
        position={[-0.12 + i * 0.08, 0.15, 0.08 - i * 0.04]}
        castShadow
      >
        <boxGeometry args={[0.07, 0.18, 0.12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    ))}
    {/* Muñeca */}
    <mesh position={[0, -0.32, 0]} castShadow>
      <cylinderGeometry args={[0.14, 0.16, 0.2, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
    {/* Líneas de impacto */}
    {[0, 1, 2].map((i) => (
      <mesh
        key={`impact-${i}`}
        position={[0.35 + i * 0.08, 0.1 - i * 0.05, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.15, 0.03, 0.03]} />
        <meshStandardMaterial
          color='#FFD700'
          emissive='#FFD700'
          emissiveIntensity={1}
        />
      </mesh>
    ))}
  </>
)

export const ghostEmblem = (color) => (
  <>
    {/* Cuerpo fantasmal principal */}
    <mesh position={[0, 0.15, 0]} castShadow>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0}
        roughness={0.2}
        transmission={0.6}
        opacity={0.75}
        transparent
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
    {/* Cola ondulada (3 segmentos) */}
    {[-0.15, 0, 0.15].map((x, i) => (
      <mesh
        key={i}
        position={[x, -0.18, 0]}
        rotation={[0, 0, x * 0.3]}
        castShadow
      >
        <coneGeometry args={[0.1, 0.28, 12]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0}
          roughness={0.2}
          transmission={0.6}
          opacity={0.75}
          transparent
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    ))}
    {/* Ojos brillantes */}
    {[-0.1, 0.1].map((x) => (
      <mesh key={`eye-${x}`} position={[x, 0.22, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color='#FF0000'
          emissive='#FF0000'
          emissiveIntensity={2}
        />
      </mesh>
    ))}
    {/* Aura fantasmal */}
    <mesh position={[0, 0.15, 0]}>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0}
        roughness={0.5}
        transmission={0.85}
        opacity={0.3}
        transparent
      />
    </mesh>
  </>
)

export const dragonEmblem = (color) => (
  <>
    {/* Cabeza de dragón */}
    <mesh position={[0, 0.28, 0]} castShadow>
      <boxGeometry args={[0.22, 0.18, 0.24]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
    {/* Cuernos */}
    {[-1, 1].map((side) => (
      <mesh
        key={`horn-${side}`}
        position={[side * 0.1, 0.42, 0]}
        rotation={[0, 0, side * Math.PI / 6]}
        castShadow
      >
        <coneGeometry args={[0.05, 0.22, 8]} />
        <meshStandardMaterial
          color='#8B4513'
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    ))}
    {/* Cuello */}
    <mesh position={[0, 0.1, 0]} castShadow>
      <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
    {/* Cuerpo */}
    <mesh position={[0, -0.08, 0]} castShadow>
      <capsuleGeometry args={[0.15, 0.25, 8, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
    {/* Alas */}
    {[-1, 1].map((side) => (
      <mesh
        key={`wing-${side}`}
        position={[side * 0.22, -0.05, 0.08]}
        rotation={[0, side * Math.PI / 6, side * Math.PI / 3]}
        castShadow
      >
        <boxGeometry args={[0.08, 0.35, 0.02]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.3}
          transmission={0.3}
        />
      </mesh>
    ))}
    {/* Cola */}
    <mesh position={[0, -0.35, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
      <coneGeometry args={[0.08, 0.3, 12]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
    {/* Llama en la boca */}
    <mesh position={[0, 0.28, 0.15]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshStandardMaterial
        color='#FF4500'
        emissive='#FF4500'
        emissiveIntensity={2}
      />
    </mesh>
  </>
)

export const darkEmblem = (color) => (
  <>
    {/* Luna creciente grande */}
    <mesh castShadow>
      <torusGeometry args={[0.28, 0.18, 16, 32, Math.PI * 1.2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
    {/* Esfera que crea el efecto de luna */}
    <mesh position={[0.12, 0, 0]}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial
        color='#000000'
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
    {/* Sombras oscuras flotantes */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.4,
            Math.sin(angle) * 0.4,
            -0.1
          ]}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color='#1a1a1a'
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      )
    })}
    {/* Brillo tenue en el borde */}
    <mesh rotation={[0, 0, Math.PI / 6]}>
      <torusGeometry args={[0.35, 0.02, 8, 32]} />
      <meshStandardMaterial
        color='#4B0082'
        emissive='#4B0082'
        emissiveIntensity={0.8}
      />
    </mesh>
  </>
)

export const steelEmblem = (color) => (
  <>
    {/* Engranaje principal */}
    <mesh castShadow>
      <cylinderGeometry args={[0.28, 0.28, 0.12, 12]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.1}
      />
    </mesh>
    {/* Dientes del engranaje */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const angle = (i / 12) * Math.PI * 2
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.32,
            Math.sin(angle) * 0.32,
            0
          ]}
          rotation={[0, 0, angle]}
          castShadow
        >
          <boxGeometry args={[0.08, 0.12, 0.12]} />
          <meshStandardMaterial
            color={color}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      )
    })}
    {/* Centro del engranaje */}
    <mesh castShadow>
      <cylinderGeometry args={[0.1, 0.1, 0.14, 16]} />
      <meshStandardMaterial
        color='#2a2a2a'
        metalness={0.95}
        roughness={0.15}
      />
    </mesh>
    {/* Tornillos decorativos */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2
      return (
        <mesh
          key={`screw-${i}`}
          position={[
            Math.cos(angle) * 0.18,
            Math.sin(angle) * 0.18,
            0.08
          ]}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial
            color='#1a1a1a'
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      )
    })}
  </>
)

export const fairyEmblem = (color) => (
  <>
    {/* Estrella de 5 puntas */}
    {[0, 1, 2, 3, 4].map((i) => {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.28,
            Math.sin(angle) * 0.28,
            0
          ]}
          rotation={[0, 0, angle + Math.PI / 2]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.25, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      )
    })}
    {/* Centro brillante */}
    <mesh>
      <sphereGeometry args={[0.14, 24, 24]} />
      <meshStandardMaterial
        color='#FFD700'
        emissive='#FFD700'
        emissiveIntensity={1.5}
        metalness={0.4}
        roughness={0.1}
      />
    </mesh>
    {/* Partículas mágicas */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const angle = (i / 8) * Math.PI * 2
      const radius = 0.4
      return (
        <mesh
          key={`particle-${i}`}
          position={[
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 0.1
          ]}
        >
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial
            color='#FFB6C1'
            emissive='#FFB6C1'
            emissiveIntensity={2}
          />
        </mesh>
      )
    })}
    {/* Brillo externo */}
    <mesh>
      <sphereGeometry args={[0.38, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  </>
)

export const normalEmblem = (color) => (
  <>
    {/* Esfera principal */}
    <mesh castShadow>
      <sphereGeometry args={[0.28, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
    {/* Anillo ecuatorial */}
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.32, 0.04, 12, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.5}
      />
    </mesh>
    {/* Polos */}
    {[-1, 1].map((side) => (
      <mesh key={side} position={[0, side * 0.35, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color='#ffffff'
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
    ))}
    {/* Detalles de superficie */}
    {[0, 1, 2, 3, 4].map((i) => {
      const angle1 = (i / 5) * Math.PI * 2
      const angle2 = Math.random() * Math.PI
      return (
        <mesh
          key={i}
          position={[
            Math.cos(angle1) * Math.sin(angle2) * 0.3,
            Math.cos(angle2) * 0.3,
            Math.sin(angle1) * Math.sin(angle2) * 0.3
          ]}
        >
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial
            color='#d4d4d4'
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      )
    })}
  </>
)
