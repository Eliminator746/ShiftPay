import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
export default function Signup() {

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")


    return <div id="background" className="bg-slate-300 h-screen flex justify-center ">
         <div id="main" className="flex items-center">
        <div id="container" className="border border-pink-100 p-4 bg-white rounded-lg">
            <Header label={"Sign Up"}/>
            <SubHeader label={"Enter your information to create an account"}/>
            <InputBox onChange={(e)=> setFirstName(e.target.value)} label={"First Name"} placeholder={"John"}/>
            <InputBox onChange={(e)=> setLastName(e.target.value)} label={"Last Name"} placeholder={"Cena"}/>
            <InputBox onChange={(e)=> setUsername(e.target.value)} label={"Email"} placeholder={"abc@gmail.com"}/>
            <InputBox onChange={(e)=> setPassword(e.target.value)} label={"Password"} placeholder={"123@q23"}/>
            <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });

            localStorage.setItem("accessToken",response.data.accessToken);
          }} label={"Sign up"} />
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
    </div>
    </div>
}

