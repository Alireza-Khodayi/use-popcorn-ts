import { useRef } from "react";
import { useKeys } from "../../hooks/useKeys";

interface IProps {
  query: string;
  setQuery: (query: string) => void;
}
function SearchBar({ query, setQuery }: IProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useKeys("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export { SearchBar };
