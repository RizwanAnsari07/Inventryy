import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignupPage = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/userRoutes/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData)
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('User Created');
        navigate('/login');
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMsg = data.errors[0]?.msg;
          toast.error(errorMsg || 'Signup failed');
        } else {
          toast.error(data.error || 'Signup failed');
        }
      }
    } catch (err) {
      console.error('Error during signup:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    
    <section
      className={`transition-all duration-300 p-4 ${
        isSidebarOpen ? 'ml-64' : 'ml-16'
      } w-full max-w-[1440px] mx-auto bg-[#FAFAFA] bg-no-repeat bg-cover bg-[url(https://i.pinimg.com/736x/3a/12/14/3a121425d7d35c9fed505d12f2c16c1c.jpg)]`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-[#FAFAFA] shadow-2xl p-4 w-full rounded-lg sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create a new account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-600 uppercase tracking-wide text-sm mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={signUpData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 uppercase tracking-wide text-sm mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={signUpData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 uppercase tracking-wide text-sm mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="Admin_Code" className="text-gray-600 uppercase tracking-wide text-sm mb-2">
                  Admin Code
                </label>
                <input
                  id="Admin_code"
                  name="code"
                  type="text"
                  value={signUpData.code}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Admin Code"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition"
              >
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
