import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function IceCreamCard({
  id,
  name,
  manufacturingDate,
  expiryDate,
  imageUrl,
  price,
  stock: initialStock,
  description,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [stock, setStock] = useState(initialStock);
  const [isEditing, setIsEditing] = useState(false);
  const [newStock, setNewStock] = useState(initialStock);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const saveStock = async () => {
    if (newStock < 0 || isNaN(newStock)) {
      alert("Stock must be 0 or greater");
      return;
    }
    try {
      const res = await fetch(`https://inventryy.onrender.com/productRoutes/${id}/stock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json();
      setStock(updated.stock);
      toast.success("Stock updated successfully");
      setOpen(false); // Close modal after saving
      setTimeout(() => {
        navigate(0)  
      }, 500);
       // Redirect to less stock page
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update stock");
    }
  };

  return (
    <>
      {/* Summary Card */}
      <div className="bg-[#F5F5F5] hover:shadow-2xl  rounded-3xl w-72 p-4 shadow-lg">
        <div className="relative h-44 overflow-hidden rounded-2xl">
          <img src={imageUrl} alt={name} className="object-contain w-full h-full" />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
          <p className="text-sm text-gray-500 mt-1 pb-5">{description}</p>
          <p className="text-sm text-gray-500 mt-1 ">Quintity:{stock}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-blue-700 font-semibold">Rs {price}</span>
            <button
              onClick={() => setOpen(true)}
              className="bg-white border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50 transition shadow-sm hover:shadow">
              View more
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-blue-50/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[url(https://media.istockphoto.com/id/1145349711/vector/blue-line-vector-background.jpg?s=612x612&w=0&k=20&c=RRxdcR1O0YSiMXuojwQ4ZZjCEnCsfdOmWO6IAK_XYOQ=)] bg-no-repeat bg-cover rounded-3xl shadow-lg max-w-md w-full overflow-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            
            <div className="flex justify-between items-center p-6">
              <h3 className="text-2xl font-bold text-blue-700">{name}</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-blue-400 hover:text-blue-600 transition duration-200">
                &times;
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <img
                src={imageUrl}
                alt={`${name}`}
                className="rounded-xl w-full h-48 object-contain border border-blue-100"/>
                
              <ul className="text-black-800 space-y-1 text-base">
                <li> <span className="font-medium">Manufactured:</span> {manufacturingDate} </li>
                <li> <span className="font-medium">Expiry:</span> {expiryDate} </li>
                <li> <span className="font-medium">Stock:</span>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={newStock}
                      onChange={e => setNewStock(Number(e.target.value))}
                      className="border border-blue-200 rounded-lg w-24 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                  ) : (
                    `${stock} units`
                  )}
               </li>
              </ul>
            </div>
  

            <div className="flex justify-evenly items-center p-4 border-t space-x-3">
              {role === "admin" && (
                <>
                  {isEditing ? (
                    <button
                      onClick={saveStock}
                      className="bg-[#709BCE] text-white px-4 py-2 rounded-full border border-white-100 hover:bg-[#3E4E88] transition">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => { setIsEditing(true); setNewStock(stock); }}
                      className="bg-[#709BCE] text-white px-4 py-2 border border-white-100 rounded-full hover:bg-[#3E4E88] transition">
                      Edit Stock
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(id)}
                    className="bg-[#709BCE] text-white px-4 py-2 border border-white-100 rounded-full hover:bg-red-600 transition">
                    Delete
                  </button>
                </>
              )}

              <button
                onClick={() => setOpen(false)}
                className="bg-[#709BCE] text-white px-4 py-2 border border-white-100 rounded-full hover:bg-[#3E4E88] transition">
                Close
              </button>
              <span className="text-xl font-bold text-white">Rs {price}</span>
            </div>

          </div>
        </div>
      )}
      
    </>
  );
}
