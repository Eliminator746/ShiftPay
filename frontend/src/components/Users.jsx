import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {

    const [user, setUser] = useState([])
    const [filter, setFilter] = useState('')


    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUser(response.data.user)
            })

    }, [filter])


    return (
        <div className="pt-4">
            <div className="font-semibold pb-2">Users</div>
            <input onChange={(e) => setFilter(e.target.value)} className="w-full text-sm bg-slate-50 border-solid border-1.5 shadow-sm py-1" placeholder="Search user..." />
            {user.map(user => <User items={user} key={user.userId} />)}
        </div>
    )
}

function User({ items }) {

    const { firstName, lastName } = items;
    const navigate= useNavigate();

    const handlePayment= () => {
        navigate('/sendmoney')
    }
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4">
                <div className="rounded-full w-6 text-center bg-slate-400 text-gray-600">{firstName[0]}</div>
                <div className="text-sm">{firstName} {lastName}</div>
            </div>
            <div>
                <Button label={"Send Money"} onClick={handlePayment} />
            </div>
        </div>
    )
}