import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useNavigate } from "react-router"

export const Dashboard = () => {
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
    
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        const fetchBalance = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                setBalance(response.data.balance);
            } catch (err) {
                if (err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/signin");
                } else {
                    setError("Failed to load balance");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [navigate, API_URL]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Appbar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="mb-8">
                    <Balance value={balance.toFixed(2)} />
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <Users />
                </div>
            </div>
        </div>
    );
}