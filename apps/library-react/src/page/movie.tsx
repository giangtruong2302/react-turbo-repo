import { useEffect, useState } from "react";
import Search from "../components/search";
import { type Movie } from "../types";
import Spinner from "../components/spinner";
import MovieCard from "../components/movie-card";
import useDebounce from "../hooks/useDebounce";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import { Models } from "appwrite";
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const Movie = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<
    Models.Document[] | undefined
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const fetchMovies = async (query: string) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const apiEndpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(apiEndpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Error fetching movies");
      }
      const data = await response.json();
      if (!data.results) {
        setErrorMessage("No movies found");
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };
  const fetchTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      if (!trendingMovies) {
        throw new Error("Error fetching trending movies");
      }
      setTrendingMovies(trendingMovies);
    } catch (error) {
      console.error(`error fetching trending movies: ${error}`);
    }
  };
  useEffect(() => {
    fetchMovies(debouncedSearchValue);
  }, [debouncedSearchValue]);
  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/static/images/hero.png" alt="hero" />
          <h1>
            Find your <span className="uppercase text-gradient">film</span>{" "}
            you'll enjoy without hasstle{" "}
          </h1>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </header>

        {trendingMovies && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id + index}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>ALL Movies</h2>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : moviesList && moviesList.length > 0 ? (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <p className="text-white">No movies found</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Movie;
