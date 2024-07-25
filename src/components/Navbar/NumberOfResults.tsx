import { IMovie } from "../../@Types/Movie";

interface IProps {
  movies: IMovie[];
}
function NumberOfResults({ movies }: IProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export { NumberOfResults };
