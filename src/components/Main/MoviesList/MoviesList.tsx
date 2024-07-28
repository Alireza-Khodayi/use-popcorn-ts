import { IMovie } from "../../../@Types/Movie";
import Movie from "./Movie";
interface IProps {
  movies?: IMovie[];
  onSelectMovie: (id: string) => void;
}
function MoviesList({ movies, onSelectMovie }: IProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export { MoviesList };
