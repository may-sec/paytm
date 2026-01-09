import { useSearchParams, useNavigate } from 'react-router';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleTransfer = async () => {
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            await axios.post(`${API_URL}/api/v1/account/transfer`, {
                to: id,
                amount: Number(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            
            setSuccess(true);
            setTimeout(() => {
                navigate("/transactions");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Transfer failed");
        } finally {
            setLoading(false);
        }
    };

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                            Transfer successful! Redirecting...
                        </div>
                    )}

                    <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                                disabled={loading || success}
                                value={amount}
                            />
                        </div>
                        <button 
                            onClick={handleTransfer}
                            disabled={loading || success}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : success ? "Success!" : "Initiate Transfer"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}