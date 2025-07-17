import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ActiveAdmin = ( {isSidebarOpen} ) => {
  const [admins, setAdmins] = useState([]);

//   const id = localStorage.getItem(id);

  useEffect(() => {
    axios.get("https://inventryy.onrender.com/userRoutes/users")
      .then((res) => setAdmins(res.data))
      .catch((err) => {
        console.error("Failed to fetch admins", err);
        toast.error("Failed to load admin list");
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://inventryy.onrender.com/userRoutes/users/${id}`);
      setAdmins(prev => prev.filter(admin => admin._id !== id));
      toast.success("Admin deleted");
    } catch (err) {
      toast.error("Failed to delete admin",err);
    }
  };


  return (
  <section className={`transition-all duration-300 p-4 ${isSidebarOpen ? "ml-64" : "ml-16"} w-full max-w-[1440px] mx-auto bg-[#FAFAFA] h-screen bg-no-repeat bg-cover bg-[url(https://i.pinimg.com/736x/3a/12/14/3a121425d7d35c9fed505d12f2c16c1c.jpg)]`}>
    

    <div className="min-w-0 w-full sm:w-3/4 md:w-1/2 mx-auto mt-6 bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h1 className="w-full text-center text-3xl font-bold mb-4 border-b-3 border-gray-500 inline-block pb-4">Active Admins</h1>
      <div className="space-y-4">
        {admins.map(admin => (
          <div key={admin._id} className="flex justify-between items-center border-b-2 border-gray-400 pb-2 mt-2">
            <div>
              <p className="font-medium">{admin.name}</p>
              <p className="text-sm text-gray-500">{admin.email}</p>
            </div>
            <button
              onClick={() => handleDelete(admin._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Admin">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
    
  </section>
  );
};

export default ActiveAdmin;
