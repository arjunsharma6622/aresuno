import React from 'react';
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="w-full h-20 border-b border-gray-300 flex items-center justify-between px-10">
            <div className="text-blue-600 text-4xl font-semibold">
                <Link to="/">Aresuno</Link>
            </div>
            <div className="flex gap-6">
                <div className="text-blue-600 text-base">
                    <Link to="/vendor/register">Vendor Register</Link>
                </div>
                <div className="text-blue-600 text-base">
                    <Link to="/login">Login</Link>
                </div>
                <div className="text-blue-600 text-base">
                    <Link to="/user/register">Signup</Link>
                </div>
            </div>

        </div>
    );
};

export default Header;
