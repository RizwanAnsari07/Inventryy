const SalesPage = ({ isSidebarOpen }) => {
  const powerbiUrl =
    "https://app.powerbi.com/view?r=eyJrIjoiOWUyZGQxYTctOGMxOC00MWQ4LWI0ZjctMTk5MjMwNTY1ZjM4IiwidCI6IjdlODYxMGU1LWQwZDUtNDE5Mi1iNjI0LTE1MTM1M2RhZDg1ZSJ9";

  return (
    <div
      className={`w-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
      <div className="flex flex-col items-center justify-start px-4 bg-cover bg-center h-screen bg-no-repeat bg-[url('https://i.pinimg.com/736x/3a/12/14/3a121425d7d35c9fed505d12f2c16c1c.jpg')]">
        <h1 className="text-4xl font-extrabold mb-5 mt-5 drop-shadow-lg">Dashboard</h1>
        <div className="relative w-full max-w-5xl pb-[43%] h-0 rounded-lg overflow-hidden shadow-2xl border-4 border-white h-screen bg-cover bg-center bg-no-repeat bg-[url('https://i.pinimg.com/736x/3a/12/14/3a121425d7d35c9fed505d12f2c16c1c.jpg')]">
          <iframe
            title="admin"
            src={powerbiUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;