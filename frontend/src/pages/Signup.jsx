import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function Signup() {

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate= useNavigate()

    const handleSignup = async () => {
      if (!firstName || !lastName || !username || !password) {
        toast.error("All fields are required");
        return;
      }
  
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
          username,
          firstName,
          lastName,
          password,
        });
        toast.success("Signup Successful")
        navigate('/signin')        
      } catch (err) {
        console.error("Signup failed", err);
        if (err.response) {
          toast.error(err.response.data.mess || "Signup failed. Please try again with valid inputs.");
        } else {
          toast.error("Network error or server unreachable.");
        }
      }
    };
  
    return (
      <div className="bg-gray-300 min-h-screen flex justify-center items-center p-4">
        <div className="bg-gray-50 shadow-xl p-8 rounded-2xl w-full max-w-md">
          <Header label="Sign Up" className="text-center text-2xl font-bold text-gray-800" />
          <SubHeader label="Enter your information to create an account" className="text-center text-gray-600 mb-6" />
  
          <div className="space-y-4">
            <InputBox onChange={(e) => setFirstName(e.target.value)} label="First Name" placeholder="John" />
            <InputBox onChange={(e) => setLastName(e.target.value)} label="Last Name" placeholder="Cena" />
            <InputBox onChange={(e) => setUsername(e.target.value)} label="Email" placeholder="abc@gmail.com" />
            <InputBox onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="********" />
          </div>
  
          <Button 
            onClick={handleSignup} 
            label="Sign Up" 
            className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-700 transition duration-300"
          />
  
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" className="mt-4 text-center" />
        </div>
      </div>
    );
  }
  

