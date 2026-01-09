import { useState, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router"
import axios from "axios"

export const Transactions = () => {
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        // Fetch transactions from backend
        axios.get(`${API_URL}/api/v1/account/transactions`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            setTransactions(response.data.transactions);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching transactions:", error);
            setError("Failed to load transactions");
            setLoading(false);
        });
    }, [navigate, API_URL]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Appbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-500">Loading transactions...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {transactions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">No transactions yet</p>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                Start sending money
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {transactions.map((txn) => (
                                <div
                                    key={txn.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            txn.type === "sent" 
                                                ? "bg-red-100 text-red-600" 
                                                : "bg-green-100 text-green-600"
                                        }`}>
                                            {txn.type === "sent" ? "↑" : "↓"}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {txn.type === "sent" ? `To: ${txn.to}` : `From: ${txn.from}`}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {txn.type === "sent" ? txn.toUsername : txn.fromUsername}
                                            </p>
                                            <p className="text-sm text-gray-500">{txn.date}</p>
                                        </div>
                                    </div>
                                    <div className={`text-lg font-semibold ${
                                        txn.type === "sent" ? "text-red-600" : "text-green-600"
                                    }`}>
                                        {txn.type === "sent" ? "-" : "+"}₹{txn.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full mt-6 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}