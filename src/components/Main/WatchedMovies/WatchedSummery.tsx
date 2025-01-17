import { IWatchedMovie } from "../../../@Types/WatchedMovie";
import { average } from "../../../utils/average";

interface IProps {
  watched: IWatchedMovie[];
}

function WatchedSummery({ watched }: IProps) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating) as number[]
  );
  const avgUserRating = average(
    watched.map((movie) => movie.userRating) as number[]
  );
  const avgRuntime = average(watched.map((movie) => movie.runtime) as number[]);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export { WatchedSummery };
