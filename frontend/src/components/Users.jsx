import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router";

export const Users = () => {
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setUsers(response.data.user)
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
                onChange={(e) => {
                    setFilter(e.target.value)
                }} 
                type="text" 
                placeholder="Search by name or email..." 
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div className="font-medium">
                    {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-slate-500">
                    {user.username}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button 
                onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} 
                label={"Send Money"} 
            />
        </div>
    </div>
}