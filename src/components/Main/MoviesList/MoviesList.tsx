import { IMovie } from "../../../@Types/Movie";
import Movie from "./Movie";
interface IProps {
  movies: IMovie[];
}
function MoviesList({ movies }: IProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
}

export { MoviesList };
