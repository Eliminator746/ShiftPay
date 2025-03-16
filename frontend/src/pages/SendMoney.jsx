import { useState } from "react";
import Button from "../components/Button"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name')

  const [amount, setAmount] = useState(0)
  const token = localStorage.getItem('accessToken')
  const navigate=useNavigate();

  const handleTransfer = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
        to: id,
        amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Transfer failed. Please try again.')
    }

  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-gray-50 shadow-2xl p-6 rounded-2xl max-w-md w-96">
        <div className="text-center font-bold text-3xl text-gray-800 pb-4">Send Money</div>

        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-inner">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
            {name.charAt(0)}
          </div>
          <div className="font-semibold text-gray-700">{name}</div>
        </div>

        <label className="block text-gray-600 text-sm mt-4">Amount (in Rs)</label>
        <input
          type="number"
          className="w-full mt-2 px-3 py-2 bg-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"

        />

        <Button

          label="Invite Transfer"
          onClick={handleTransfer}
        />
      </div>
    </div>
  );
}