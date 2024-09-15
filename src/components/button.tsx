const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="bg-gradient-to-r from-red-800 to-red-700 text-gray-300 font-semibold py-1 px-4 rounded-lg shadow-lg  transition-shadow duration-500 ease-in-out active:shadow-inner transform hover:scale-105">
      {children}
    </button>
  );
};

export default Button;
