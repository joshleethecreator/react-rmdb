import { useState, useEffect } from "react"
//api
import API from '../API'
//helpers
import { isPersistedState } from "../helpers"

//intital state and object format
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
}

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  //state stores the movie list
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      //set error to false and loading to true
      setError(false)
      setLoading(true)

      //get movie list from api
      const movies = await API.fetchMovies(searchTerm, page)
      console.log(movies)

      //set state to store movies
      setState(prev => ({
        ...movies,
        results:
          // add more movies into state.results if the state.page is greater than 1
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
      }))
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }
  
  // Search and initial
  useEffect(() => {
    if(!searchTerm) {
      const sessionState = isPersistedState('homeState')

      if(sessionState) {
        console.log('grabbing from session storage')
        setState(sessionState)
        return
      }
    }
    
    // grabbing from api
    console.log('grabbing from api')
    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm])

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return
    
    fetchMovies(state.page + 1, searchTerm)
    setIsLoadingMore(false)
  }, [isLoadingMore, state.page, searchTerm])

  // Write to session storage
  useEffect(()=>{
    if(!searchTerm) {
      sessionStorage.setItem('homeState', JSON.stringify(state))
    }
  },[searchTerm, state])

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore}
}