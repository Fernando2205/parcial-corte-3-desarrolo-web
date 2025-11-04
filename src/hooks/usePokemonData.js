import { useState, useEffect, useCallback } from 'react'
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonPage } from '../api/pokeApi'
import { API_CONFIG } from '../constants/config'

export const usePokemonData = (limit = API_CONFIG.DEFAULT_LIMIT) => {
  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Cargar detalles de un Pokémon específico
  const loadPokemonListDetails = useCallback(async (pokemon) => {
    try {
      setLoadingDetails(true)
      const details = await fetchPokemonDetails(pokemon.name)
      setSelectedPokemon(details)
    } catch (error) {
      console.error('Error loading pokemon details:', error)
      setError(error.message)
    } finally {
      setLoadingDetails(false)
    }
  }, [])

  // Extraer offset de una URL de la API para calcular la página actual
  const getOffsetFromUrl = (url) => {
    try {
      const parsed = new URL(url)
      const offset = parseInt(parsed.searchParams.get('offset') || '0', 10)
      return Number.isNaN(offset) ? 0 : offset
    } catch {
      return 0
    }
  }

  const loadPokemonList = useCallback(async (urlOrPage = 1) => {
    try {
      setLoading(true)
      setError(null)

      let response

      // Si es una URL, usarla directamente (next/previous de la API)
      if (typeof urlOrPage === 'string') {
        response = await fetchPokemonPage(urlOrPage)
      } else {
        // Si es un número de página, calcular offset
        const page = urlOrPage || 1
        const offset = (page - 1) * limit
        response = await fetchPokemonList(limit, offset)
      }

      // Guardar URLs next/previous de la API
      const nextUrl = response.next || null
      const previousUrl = response.previous || null
      setTotalCount(response.count || 0)

      // Calcular página actual desde el next URL (más confiable que previous)
      const currentOffset = response.next
        ? getOffsetFromUrl(response.next) - limit
        : Math.floor((response.count - 1) / limit) * limit

      const page = Math.floor(currentOffset / limit) + 1
      setCurrentPage(page)

      // Mapear resultados con ID extraído de la URL
      const basicList = response.results.map((pokemon) => {
        const urlParts = pokemon.url.split('/')
        const id = parseInt(urlParts[urlParts.length - 2])

        return {
          name: pokemon.name,
          url: pokemon.url,
          id
        }
      })

      setPokemonList(basicList)

      // Cargar detalles del primero en la carga inicial
      if (basicList.length > 0 && !selectedPokemon && page === 1) {
        await loadPokemonListDetails(basicList[0])
      }

      return { nextUrl, previousUrl }
    } catch (error) {
      setError(error.message)
      console.error('Error loading pokemon:', error)
      return { nextUrl: null, previousUrl: null }
    } finally {
      setLoading(false)
    }
  }, [limit, selectedPokemon, loadPokemonListDetails])

  const handlePokemonSelect = useCallback((pokemon) => {
    loadPokemonListDetails(pokemon)
  }, [loadPokemonListDetails])

  useEffect(() => {
    loadPokemonList(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funciones de navegación usando next/previous de la API
  const goToNextPage = useCallback(async () => {
    const { nextUrl } = await loadPokemonList(currentPage + 1)
    if (nextUrl) {
      await loadPokemonList(nextUrl)
    }
  }, [currentPage, loadPokemonList])

  const goToPreviousPage = useCallback(async () => {
    if (currentPage > 1) {
      await loadPokemonList(currentPage - 1)
    }
  }, [currentPage, loadPokemonList])

  const goToPage = useCallback((page) => {
    const totalPages = Math.ceil(totalCount / limit)
    if (page >= 1 && page <= totalPages) {
      loadPokemonList(page)
    }
  }, [totalCount, limit, loadPokemonList])

  return {
    pokemonList,
    selectedPokemon,
    onPokemonSelect: handlePokemonSelect,
    loading,
    loadingDetails,
    error,
    reload: loadPokemonList,
    // Paginación
    currentPage,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    goToNextPage,
    goToPreviousPage,
    goToPage,
    hasNextPage: currentPage < Math.ceil(totalCount / limit),
    hasPreviousPage: currentPage > 1
  }
}
