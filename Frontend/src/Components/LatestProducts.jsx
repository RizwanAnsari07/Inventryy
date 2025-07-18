import { useEffect, useState } from 'react';
import IceCreamCard from './newCard';

const LatestProducts = ( {isSidebarOpen} ) => {
  const [p, setP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLProducts, setSearchLProducts] = useState("");

 useEffect(() => {
  fetch("https://inventryy.onrender.com/productRoutes/latestproducts")
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      setP(data);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

  const filteredLProducts = p.filter((item) =>
    item.name.toLowerCase().includes(searchLProducts.toLowerCase())
  );

if (!p) return <p>No product found.</p>;

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-[90vh]">
        <img className="w-7 h-7" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="" />
          <p className="ml-2 text-lg text-blue-600">Loading Products...</p>
      </div>
    );
  }

return (
 <>
     <div className={`transition-all duration-300 p-4 ${isSidebarOpen ? "ml-64" : "ml-16"} w-full max-w-[1440px] mx-auto`}>
       
      {/* Search Form */}
      <form
          className="flex items-center max-w-xl"
          onSubmit={(e) => e.preventDefault()}>   
          <label htmlFor="voice-search" className="sr-only">Search</label>

          <input
              type="text"
              id="voice-search"
              className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5 border dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Products"
              value={searchLProducts}
              onChange={(e) => setSearchLProducts(e.target.value)}
              required />
    
          <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>Search
          </button>
      </form>
       
       {/* Cards flex */}
       <div className="flex flex-row flex-wrap justify-evenly mt-6 space-x-4 space-y-4">
        {filteredLProducts.length > 0 ? (
          filteredLProducts.map((item) => ( // For search functionality
         <IceCreamCard
           key={item.id}
           id={item.id}
           name={item.name}
           manufacturingDate={item.manufacturing_date}
           expiryDate={item.expiry_date}
           imageUrl={item.image_url}
           price={item.price}
           quantity={item.quantity}
           stock={item.stock}/>
         ))) : (
                 <p className="w-full text-left mx-4 text-gray-600 text-lg col-span-full">No results found.</p>
               )}
       </div>
 
     </div>
     </>
);

}

export default LatestProducts;