# PokéCards 3D Elements

Desarrollar una aplicación web interactiva que visualice tarjetas de Pokémon con
información real obtenida desde la PokeAPI, donde cada tarjeta refleje visualmente el
tipo elemental del Pokémon (fuego, agua, planta, eléctrico, etc.) mediante color, forma y
símbolos 3D.

El proyecto integrará:

· Consumo de una API REST (PokeAPI),

· React con Vite,

· Librerías 3D (@react-three/fiber, @react-three/drei),

· Manejo de estado y comunicación entre componentes.

# Descripción del reto

Ustedes trabajarán en grupos de 4 personas para construir una aplicación llamada:

PokéCards 3D Elements

Esta app será una mini Pokédex, donde:

· Cada Pokémon se muestra como una tarjeta.

· Cada tarjeta tiene su nombre, tipo(s) y un símbolo 3D que representa su tipo
elemental.

· Al hacer click en una lista o al buscar el pokemon, se muestran los detalles del
Pokémon seleccionado.

# Características del proyecto

## 1. Consumo de API (PokeAPI)

· Usar una api de su preferencia.

Ejemplo: https://pokeapi.co/api/v2/pokemon?limit=9

https://codepen. io/LiliMonroy/pen/WNdwZwK

· De cada Pokémon deben obtener:
o id  
 o name  
 o types -> lista de tipos (fire, water, grass, etc.)  
 o sprites. front_default -> imagen oficial

· Mostrar mensaje "Cargando ... " mientras llegan los datos.

· Manejar errores si la API falla.

## 2. Interfaz general

La aplicación debe tener dos secciones principales:

### Panel lateral (2D)

· Muestra lista con los Pokémon (nombre).

· Permite seleccionar un Pokémon.

· Debajo, una sección "Detalles" muestra:

o Nombre  
 o ID (número Pokédex)  
 o Tipos  
 o Sprite grande

## Escena 3D

· Contiene un <Canvas> con <OrbitControls /> para rotar y hacer zoom.

· Muestra una canvas .

· Cada tarjeta representa un Pokémon y debe:

o Mostrar su nombre en texto 3D (<Text> de @react-three/drei)  
 o Tener color principal según el tipo elemental (fire=rojo, water=azul, grass=verde, etc.)  
 o Incluir un emblema 3D alusivo al tipo:

    ▪ Fire -> cono naranja (llama)
    ▪ Water -> esfera estirada azul (gota)
    ▪ Grass -> plano verde (hoja)
    ▪ Electric -> triángulo amarillo (rayo)
    ▪ Ice -> prisma o cristal azul claro

o Rotar lentamente (animación continua)  
 o Agrandarse con hover  
 o Ser clicable (al hacer click -> seleccionar ese Pokémon)

## 1. Distribución visual como ustedes quieran

· Los pokemon deben de verse como una pokedex y tener su emblema en 3D

## 4. Documentación (README.md)

Cada grupo debe incluir un archivo README.md con:

1. Integrantes (nombres completos y roles elegidos).
2. Descripción corta del proyecto.
3. Breve explicación de cómo conectaron la API.
4. Cómo decidieron representar los elementos (colores / figuras).
