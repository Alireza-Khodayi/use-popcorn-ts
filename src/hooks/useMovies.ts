import { useEffect, useState } from 'react';
import { IMovie } from '../@Types/Movie';

const APIKEY = '66e646b8';

export function useMovies(query: string) {
  const [movies, setMovies] = useState<IMovie[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovie() {
        try {
          setIsLoading(true);
          setError('');
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!response.ok)
            throw new Error('Somthing went wrong with fetch movies!');

          const data = await response.json();
          if (data.Response === 'False') throw new Error('Movie Not Found!');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError')
            setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      getMovie();

      return function () {
        controller.abort();
      };
    },
    [query],
  );
  return { movies, isLoading, error };
}
