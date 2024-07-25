import { IWatchedMovie } from "../../../@Types/WatchedMovie";
import { WatchedMovie } from "./WatchedMovie";

interface IProps {
  watched: IWatchedMovie[];
}
function WatchedMoviesList({ watched }: IProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
}

export { WatchedMoviesList };
