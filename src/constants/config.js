export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  SPRITES_BASE_URL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
  DEFAULT_LIMIT: 10,
  DEFAULT_OFFSET: 0,
  REQUEST_TIMEOUT: 10000
}

export const SPRITE_SOURCES = {
  HOME: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/home/${id}.png`,
  HOME_SHINY: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/home/shiny/${id}.png`,
  OFFICIAL_ARTWORK: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/official-artwork/${id}.png`,
  DREAM_WORLD: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/dream-world/${id}.svg`
}
