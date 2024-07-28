import { useState } from "react";
import { Main } from "./components/Main";
import { Logo, Navbar, NumberOfResults, SearchBar } from "./components/Navbar";
import { MoviesList } from "./components/Main/MoviesList";
import { Box } from "./components/UI/Box";
import {
  WatchedMoviesList,
  WatchedSummery,
} from "./components/Main/WatchedMovies";
import Loading from "./components/UI/Loading/Loading";
import ErrorMessage from "./components/UI/Error/ErrorMessage";
import MovieDetails from "./components/Main/MovieDetails/MovieDetails";
import { IWatchedMovie } from "./@Types/WatchedMovie";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<IWatchedMovie[]>(
    [],
    "watched"
  );
  // const [watched, setWatched] = useState<IWatchedMovie[]>([]);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
    document.title = "🍿usePopCorn";
  }

  function handleAddWatched(movie: IWatchedMovie) {
    setWatched((watched) => watched && [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id: string) {
    setWatched((watched) => watched?.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumberOfResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
