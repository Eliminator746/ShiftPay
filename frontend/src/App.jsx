import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import SignIn from "./pages/signin";
import Signup from "./pages/signup";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sendmoney" element={<SendMoney />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} /> 
      </Routes>
      </BrowserRouter>
    </>
  )
}





