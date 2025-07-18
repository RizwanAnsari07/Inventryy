import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import IceCreamCard from './newCard';
  
const ProductPage = ( {isSidebarOpen} ) => {
  const navigate = useNavigate();
  const [products,setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      // navigate("/loginpage");
    }
    fetch("https://inventryy.onrender.com/productRoutes/allproducts", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        
      });
  }, []);


  // For Deleting Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://inventryy.onrender.com/productRoutes/${id}`);
      toast.success("Product deleted successfully");
  
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchProducts.toLowerCase())
  );


  return (
    <>
    <div className={`transition-all duration-300 p-4 ${isSidebarOpen ? "ml-64" : "ml-16"} w-full max-w-[1440px] mx-auto`}>
      
      {/* Search Form */}
          
      <form
          className="flex items-center max-w-xl"
          onSubmit={(e) => e.preventDefault()}>   
          <label for="voice-search" className="sr-only">Search</label>

          <input
              type="text"
              id="voice-search"
              className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5 border dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Products"
              value={searchProducts}
              onChange={(e) => setSearchProducts(e.target.value)}
              required />
             
          <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              Search
          </button>
      </form>


      {/* Cards flex */}
      <div className="flex flex-row flex-wrap justify-evenly mt-6 space-x-4 space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
        <IceCreamCard
          key={item._id}
          id={item._id}
          description={item.description}
          name={item.name}
          manufacturingDate={item.manufacturing_date}
          expiryDate={item.expiry_date}
          imageUrl={item.image_url}
          price={item.price}
          quantity={item.quantity}
          stock={item.stock}
          onDelete={handleDelete}/>
        ))) : (
                <p className="w-full text-left mx-4 text-gray-600 text-lg col-span-full">No results found.</p>
              )}
      </div>

    </div>
    </>
  );
}

export default ProductPage