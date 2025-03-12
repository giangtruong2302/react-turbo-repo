import { Movie } from "../types";
type Props = {
  movie: Movie;
};
const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/static/images/no-movie.png"
        }
        alt={movie.title}
      />
      <div className="mt-4">
        <h3>{movie.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/static/images/star.svg" alt="star" />
            <span>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
          <span>•</span>
          <div className="lang">{movie.original_language.toUpperCase()}</div>
          <span>•</span>
          <div className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
