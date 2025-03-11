type SearchProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  return (
    <div className="search">
      <div>
        <img src="/static/images/search.svg" alt="search-icon" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
