import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"

export default function SignIn(){

    return <div id="background" className="bg-slate-300 h-screen flex justify-center ">
        <div id="main" className="flex items-center">
            <div id="container" className="border border-pink-100 p-4 bg-white rounded-lg">
                <Header label={"Sign In"}/>
                <SubHeader label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"abc@gmail.com"} />
                <InputBox label={"Password"} placeholder={"123@q23"} />
                <Button label={"Sign In"} />
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}

