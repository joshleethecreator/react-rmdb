import {useState, useEffect, useCallback} from 'react';
// api
import API from '../API'
// helpers
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  //fetch single movie data when movie id changed
  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true)
      setError(false)

      const movie = await API.fetchMovie(movieId)
      const credits = await API.fetchCredits(movieId)

      // Get director name
      const directors = credits.crew.filter(
        member => member.job === 'Director'
      )

      setState({
        ...movie,
        actors: credits.cast,
        director: directors
      })

      setLoading(false)

    } catch (error) {
      setError(true)
    }
  }, [movieId])

  
  useEffect(() => {
    const sessionState = isPersistedState(movieId)

    if(sessionState) {
      setState(sessionState)
      setLoading(false)
      return
    }
    fetchMovie()
  }, [movieId, fetchMovie])

  // write to session storage
  useEffect(()=>{
    sessionStorage.setItem(movieId, JSON.stringify(state))
  }, [movieId, state])

  return {state, loading, error}
}