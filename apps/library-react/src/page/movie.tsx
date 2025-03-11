import { useState } from "react";
import Search from "../components/search";

const Movie = () => {
  const [searchValue, setSearchValue] = useState<string>("");
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
        </header>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </main>
  );
};

export default Movie;
