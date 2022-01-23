import {useState, useEffect, useCallback} from 'react';

import API from '../API'

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
    fetchMovie()
  }, [movieId, fetchMovie])

  return {state, loading, error}
}