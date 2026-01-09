import { useState, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router"

export const Transactions = () => {
    const navigate = useNavigate();
    const [transactions] = useState([
        // This is mock data - you'll need to create an API endpoint for real transactions
        { id: 1, type: "sent", amount: 500, to: "John Doe", date: "2026-01-08" },
        { id: 2, type: "received", amount: 1000, from: "Jane Smith", date: "2026-01-07" },
        { id: 3, type: "sent", amount: 250, to: "Bob Wilson", date: "2026-01-06" },
    ]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

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