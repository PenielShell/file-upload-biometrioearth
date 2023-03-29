import React from "react"
const SearchBar = () => {
  const [query, setQuery] = React.useState('');
    
  return (
    <div className="col-md-4 w-100 py-0 my-3">
      <input
        type="search"
        className="form-control"
        placeholder="Search File..."
        value={query} onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
export default SearchBar