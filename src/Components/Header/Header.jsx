import React from 'react';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from '../../userSlice';
import axios from "axios";
import { useCookies } from "react-cookie";



const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(user)
    const [cookies, removeCookie] = useCookies([]);



    return (
        <div className="w-full h-20 border-b border-gray-300 flex items-center justify-between px-10">
            <div className="text-blue-600 text-4xl font-semibold">
                <Link to="/">Aresuno</Link>
            </div>

            {user.name === "" &&

                <div className='flex gap-6'>

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
            }


            {user &&
                <div className='flex gap-6'>

                    <div className="text-blue-600 text-base">
                        <Link to={`/${user.userType}/dashboard`}>{user.name}</Link>
                    </div>
                    <div className="text-blue-600 text-base">
                        <span onClick={async () => {
                            dispatch(userLogout());
                            await axios.post("https://aresuno-server.vercel.app/api/logout")
                        }}>
                            Logout</span>
                    </div>

                </div>

            }



        </div>
    );
};

export default Header;
