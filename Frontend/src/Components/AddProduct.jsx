import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const AddProduct = ({ isSidebarOpen }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
    Manufacturing: '',
    Expiry: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image_url: product.imageUrl,
      stock: parseInt(product.stock),
      manufacturing_date: product.Manufacturing,
      expiry_date: product.Expiry,
    };

    try {
      const res = await axios.post('https://inventryy.onrender.com/productRoutes/addproduct', payload);
      toast.success("Product Added Successfully")
      console.log('Response:', res.data);

      setProduct({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
        Manufacturing: '',
        Expiry: ''
      });
    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);
      alert('Error adding product: ' + (err.response?.data?.error || err.message));
    }
  };


  return (
    <>
      <div className={`transition-all duration-300 p-8 ${isSidebarOpen ? "ml-64" : "ml-16"} flex flex-col justify-center bg-[#FAFAFA] `}>
        <div className="min-h-screen rounded-3xl flex items-center justify-center ">
          <div className="w-full min-h-screen ">
            <form onSubmit={handleSubmit} className=" p-8 rounded-3xl shadow-xl space-y-6  bg-no-repeat bg-cover bg-[url(https://i.pinimg.com/736x/3a/12/14/3a121425d7d35c9fed505d12f2c16c1c.jpg)]">
            <h2 className="text-center font-bold text-3xl border-b-3 border-gray-500 mb-6 pb-3">
              Add New Product </h2>
              <div className="bg-[#709BCE] p-4 rounded-t-3xl mb-3">
                <p className="text-center text-white font-semibold">
                  Enter the product details as requested below
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Product Name</label>
                  <input id="name" name="name" type="text" value={product.name} onChange={handleChange} required placeholder="Enter product name" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Price (₹)</label>
                  <input id="price" name="price" type="number" step="0.01" value={product.price} onChange={handleChange} required placeholder="Enter price" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Description</label>
                <textarea id="description" name="description" rows="4" value={product.description} onChange={handleChange} required placeholder="Enter product description" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="imageUrl" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Image URL</label>
                  <input id="imageUrl" name="imageUrl" type="url" value={product.imageUrl} onChange={handleChange} required placeholder="https://example.com/product.jpg" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="stock" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Number of Stocks</label>
                  <input id="stock" name="stock" type="number" value={product.stock} onChange={handleChange} required placeholder="200" className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Manufacturing" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Manufacturing Date</label>
                  <input id="Manufacturing" name="Manufacturing" type="date" value={product.Manufacturing} onChange={handleChange} required className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Expiry" className="text-gray-600 uppercase tracking-wide text-sm mb-2">Expiry Date</label>
                  <input id="Expiry" name="Expiry" type="date" value={product.Expiry} onChange={handleChange} required className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;