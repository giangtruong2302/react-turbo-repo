import { useEffect, useState } from "react";
import Search from "../components/search";
import { type Movie } from "../types";
import Spinner from "../components/spinner";
import MovieCard from "../components/movie-card";
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
  const [loading, setLoading] = useState<boolean>(false);
  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const apiEndpoint = `${API_URL}/discover/movie?sort_by=popularity.desc`;
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
    } catch (error) {
      console.error(`error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
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
        <section className="all-movies">
          <h2 className="mt-5">ALL Movies</h2>
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
            <p>No movies found</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Movie;
