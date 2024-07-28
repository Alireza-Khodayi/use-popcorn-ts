import { IMovie } from '../../../@Types/Movie';

interface IProps {
  movie: IMovie;
  onSelectMovie: (id: string) => void;
}
function Movie({ movie, onSelectMovie }: IProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
