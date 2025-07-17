
const SearchBox = () => {
    const query=true
  return (
    <div className="w-full max-w-sm mx-auto">
      <input
        type="text"
        value="value"
        // onChange={e => setQuery(e.target.value)}
        // placeholder={placeholder}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      {/* {query && (
        <ul className="mt-1 bg-white border rounded shadow max-h-48 overflow-auto">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => onSelect?.(item)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )} */}
    </div>
  );
}

export default SearchBox
