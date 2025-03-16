import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DropdownMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/signin');
    };

    return (
        <div className="relative">
            <button 
                className="flex items-center justify-center rounded-full bg-slate-300 w-10 h-10 text-lg font-semibold"
                onClick={toggleDropdown}
            >
                {user.charAt(0).toUpperCase()}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                    <a 
                        onClick={handleLogout} 
                        className="block text-gray-800 px-4 py-2 hover:bg-slate-200 cursor-pointer"
                    >
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
}
