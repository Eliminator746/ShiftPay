import axios from "axios"
import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      })
      // console.log('response : ', response);
      
      localStorage.setItem("accessToken", response.data.accessToken);
      toast.success("Login Successful")
      navigate('/dashboard')
    } catch (error) {
      console.error("Sign-in failed", error);
      toast.error(error?.response?.data?.message || error?.message || "Sign-in failed");

    }
  };
  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center p-4">
      <div className="bg-gray-50 shadow-xl p-8 rounded-2xl w-full max-w-md">
        <Header label="Sign In" className="text-center text-2xl font-bold text-gray-800" />
        <SubHeader label="Enter your credentials to access your account" className="text-center text-gray-600 mb-6" />

        <div className="space-y-4">
          <InputBox onChange={(e) => setUsername(e.target.value)} label="Email" placeholder="abc@gmail.com" />
          <InputBox onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="********" />
        </div>

        <Button
          onClick={handleSignIn}
          label="Sign In"
          className="w-full bg-green-600 text-white py-2 mt-6 rounded-lg hover:bg-green-700 transition duration-300"
        />

        <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" className="mt-4 text-center" />
      </div>
    </div>
  )
}

