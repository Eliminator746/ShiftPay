import axios from "axios";
import { useState, useEffect } from "react";
import Appbar from "../components/appbar";
import Balance from "../components/balance";
import Users from "../components/Users";
import { toast } from "react-toastify";

export default function Dashboard() {

    const [user, setUser] = useState('')
    const [balance, setBalance] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token){
                toast.error("Authentication token is missing");
                return res.status(400).send("Authentication token is missing");
            }
                
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/currentuser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setBalance(res.data.balance)
            } catch (err) {
                console.error("Failed to fetch user data", err);
                toast.error("Failed to fetch user data");
            }
        };

        fetchUser();
    }, []);


    return <div>
        <Appbar user={user} />
        <div className="px-8 pt-5">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}