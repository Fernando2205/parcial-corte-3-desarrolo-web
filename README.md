# PokéCards 3D Elements

## 1. Integrantes del Grupo

| Nombre Completo                 | Rol                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| Delio Fernando Palacios Viafara | Full Stack Developer (Frontend, 3D Graphics, Integración con la API & Manejo de estado) |

## 2. Descripción del Proyecto

**PokéCards 3D Elements** es una aplicación web interactiva que funciona como una Pokédex moderna, mostrando tarjetas 3D de Pokémon con información en tiempo real obtenida de la PokeAPI.

Cada tarjeta refleja visualmente el tipo elemental del Pokémon mediante:

- Colores característicos de cada tipo
- Emblemas 3D únicos que representan el elemento
- Animaciones suaves e interactivas
- Información detallada (nombre, número Pokédex, estadísticas, tipos, dimensiones)

La aplicación permite navegar por la lista de Pokémon, seleccionar cualquiera para ver sus detalles, y visualizar su tarjeta 3D interactiva con rotación automática y efectos de hover.

## 3. Conexión con la API

### PokeAPI

Utilizamos la [PokeAPI](https://pokeapi.co/) para obtener toda la información de los Pokémon:

**Endpoint principal:**

```
https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

**Flujo de integración:**

1. **Lista de Pokémon**: Solicitamos la lista paginada desde el endpoint principal
2. **Detalles del Pokémon**: Para cada Pokémon seleccionado, hacemos una petición a su URL específica
3. **Datos obtenidos**:
   - `id`: Número de la Pokédex
   - `name`: Nombre del Pokémon
   - `types`: Array de tipos elementales
   - `sprites.other.home.front_default`: Imagen oficial de alta calidad
   - `sprites.front_default`: Imagen alternativa (fallback)
   - `stats`: Estadísticas base (HP, Attack, Defense, Speed)
   - `height` y `weight`: Dimensiones físicas

**Implementación técnica:**

- Custom hook `usePokemonData` para gestionar las peticiones
- Sistema de paginación con límite de 20 Pokémon por página
- Manejo de estados de carga (loading/loadingDetails)
- Gestión de errores con mensajes toast
- Fallback de sprites (intenta cargar home sprite, si falla usa front_default)

## 4. Representación Visual de Elementos

### Paleta de Colores por Tipo

Cada tipo elemental tiene un color base que se aplica a la tarjeta:

| Tipo     | Color          | Hexadecimal |
| -------- | -------------- | ----------- |
| Normal   | Gris           | `#A8A878`   |
| Fire     | Rojo-Naranja   | `#F08030`   |
| Water    | Azul           | `#6890F0`   |
| Electric | Amarillo       | `#F8D030`   |
| Grass    | Verde          | `#78C850`   |
| Ice      | Celeste        | `#98D8D8`   |
| Fighting | Rojo Oscuro    | `#C03028`   |
| Poison   | Púrpura        | `#A040A0`   |
| Ground   | Marrón         | `#E0C068`   |
| Flying   | Azul Claro     | `#A890F0`   |
| Psychic  | Rosa           | `#F85888`   |
| Bug      | Verde Lima     | `#A8B820`   |
| Rock     | Beige          | `#B8A038`   |
| Ghost    | Violeta Oscuro | `#705898`   |
| Dragon   | Azul Índigo    | `#7038F8`   |
| Dark     | Negro          | `#705848`   |
| Steel    | Gris Metálico  | `#B8B8D0`   |
| Fairy    | Rosa Claro     | `#EE99AC`   |

### Emblemas 3D por Tipo

Cada tipo elemental se representa con una figura 3D única y detallada:

| Tipo         | Forma 3D       | Descripción                                                                                     |
| ------------ | -------------- | ----------------------------------------------------------------------------------------------- |
| **Fire**     | Llama Triple   | Tres conos apilados (rojo, naranja, amarillo) con chispas brillantes y base de fuego            |
| **Water**    | Gota           | Esfera con punta cónica translúcida, burbujas internas y ondas en la base                       |
| **Grass**    | Hoja Triple    | Hoja central con nervadura y dos hojas laterales más pequeñas, con tallo                        |
| **Electric** | Rayo Zigzag    | Tres segmentos rectangulares en forma de rayo con chispas eléctricas flotantes                  |
| **Ice**      | Cristal        | Octaedro central con 6 rayos cristalinos y pequeños cristales en las puntas                     |
| **Fighting** | Puño Cerrado   | Mano cerrada detallada con 4 dedos, pulgar, muñeca y líneas de impacto doradas                  |
| **Poison**   | Burbujas       | Burbuja principal grande con burbujas medianas, pequeñas y reflejo de luz                       |
| **Ground**   | Montículo      | Cono con rocas incrustadas (4 rocas de diferentes tamaños) y base plana                         |
| **Flying**   | Alas           | Par de alas detalladas con plumas superiores e inferiores, cuerpo central y cola emplumada      |
| **Psychic**  | Anillos        | Tres anillos concéntricos rotados con esfera central brillante y 6 partículas de energía        |
| **Bug**      | Insecto        | Cabeza, tórax, abdomen segmentado (3 partes), 2 antenas, 6 patas y alas translúcidas            |
| **Rock**     | Formación      | Roca central grande con 4 rocas medianas alrededor y fragmentos pequeños en la base             |
| **Ghost**    | Fantasma       | Esfera translúcida con cola ondulada (3 segmentos), ojos rojos brillantes y aura fantasmal      |
| **Dragon**   | Dragón         | Cabeza con 2 cuernos, cuello, cuerpo, alas membranosas, cola cónica y llama en la boca          |
| **Dark**     | Luna Creciente | Torus formando media luna con esfera negra, 4 sombras flotantes y brillo púrpura en el borde    |
| **Steel**    | Engranaje      | Cilindro principal con 12 dientes, centro oscuro y 4 tornillos decorativos                      |
| **Fairy**    | Estrella       | Estrella de 5 puntas con centro dorado brillante, 8 partículas mágicas rosadas y brillo externo |
| **Normal**   | Planeta        | Esfera con anillo ecuatorial, polos blancos y 5 detalles de superficie                          |

### Elementos de la Tarjeta 3D

Cada tarjeta incluye:

1. **Base**: RoundedBox con el color del tipo principal
2. **Fondo interno**: Plano blanco para contraste
3. **Sprite animado**: Imagen oficial del Pokémon
4. **Información superior**:
   - Número de Pokédex (#001, #025, etc.)
   - Nombre del Pokémon
5. **Badges de tipos**: Hasta 2 tipos con sus colores
6. **Datos físicos**: Altura y peso
7. **Estadísticas**: Barras de progreso para HP, Attack, Defense y Speed
8. **Emblema 3D**: Flotando al costado de la tarjeta
9. **Efectos visuales**:
   - Rotación automática continua
   - Hover: Escala aumenta a 1.2x
   - Selección: Aro dorado giratorio con partículas brillantes
   - Luz dinámica que cambia con hover

### Escenografía 3D

- **Fondo**: Skybox de 6 planos oscurecidos para crear atmósfera
- **Piso**: Plano verde (#80A84F) a 40 unidades de profundidad
- **Iluminación**:
  - Luz ambiental suave
  - Luz direccional principal
  - Luces puntuales por tarjeta (color dinámico según tipo)

---

**Fecha de desarrollo:** Noviembre 2025  
**Curso:** Desarrollo de Aplicaciones Web
