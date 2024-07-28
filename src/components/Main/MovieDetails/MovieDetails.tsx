import { useEffect, useState } from 'react';
import { DetailedMovie } from '../../../@Types/DetailedMovie';
import { StarRating } from '../../UI/StarRating';
import Loading from '../../UI/Loading/Loading';
import { IWatchedMovie } from '../../../@Types/WatchedMovie';
import { useKeys } from '../../../hooks/useKeys';

interface IProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: IWatchedMovie) => void;
  watched?: IWatchedMovie[];
}
const APIKEY = '66e646b8';

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: IProps) {
  const [movie, setMovie] = useState<DetailedMovie>({} as DetailedMovie);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number>();

  const isWatched = watched?.map(movie => movie.imdbId).includes(selectedId);
  const watchedUserRating = watched?.find(
    movie => movie.imdbId === selectedId,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useKeys('Escape', onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`,
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId],
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `🍿| ${title}`;
      return function () {
        document.title = 'usePopCorn🍿';
      };
    },

    [title],
  );

  return (
    <div className='details' key={selectedId}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    defaultRating={0}
                    color='#28bd52'
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  You rated with movie {watchedUserRating}⭐
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
