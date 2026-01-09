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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (err) {
                if (err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return <div>
        <Appbar />
        <div className="m-8">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Balance value={balance.toFixed(2)} />
                    <Users />
                </>
            )}
        </div>
    </div>
}