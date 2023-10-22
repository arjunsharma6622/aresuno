import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from '../../userSlice';
import axios from "axios";



const Header = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(user)



    return (
        <div className="w-full h-20 border-b border-gray-300 flex items-center justify-between px-10">
            <div className="text-blue-600 text-4xl font-semibold">
                <Link to="/">Aresuno</Link>
            </div>


{user.name == "" &&
                <div className='flex gap-6'>

                    <div className="text-blue-600 text-base">
                        <Link to="/login">Login</Link>
                    </div>

                    <div className="text-blue-600 text-base">
                        <Link to="/signup">Signup</Link>
                    </div>

                </div>

}

{ !user.name == "" &&


                <div className='flex gap-6'>

                    <div className="text-blue-600 text-base">
                        <Link to={`/${user.userType}/dashboard`}>{user.name}</Link>
                    </div>
                    <div className="text-blue-600 text-base cursor-pointer">
                        <span onClick={async () => {
                            localStorage.removeItem("token")  
                            dispatch(userLogout())                         
                            navigate("/")
                        }}>
                            Logout</span>
                    </div>

                </div>

                    }



        </div>
    );
};

export default Header;
