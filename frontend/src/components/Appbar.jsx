import { useNavigate } from "react-router"
import { useState } from "react"

export const Appbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    
    const firstName = localStorage.getItem("firstName") || "User";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        navigate("/signin");
    };

    return (
        <div className="shadow h-16 flex justify-between items-center px-4 bg-white border-b">
            <div 
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/dashboard")}
            >
                <img 
                    src="/paytm.png" 
                    alt="PayTM" 
                    className="h-8 w-8 mr-2"
                />
                <span className="text-xl font-bold text-blue-600">PayTM App</span>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate("/transactions")}
                    className="hidden sm:block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                    Transactions
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {firstName[0].toUpperCase()}
                        </div>
                        <span className="hidden sm:block font-medium">{firstName}</span>
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    navigate("/profile");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    navigate("/transactions");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 sm:hidden"
                            >
                                Transactions
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}