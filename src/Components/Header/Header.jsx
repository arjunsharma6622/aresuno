import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogout } from '../../state/slices/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <div className="w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="text-blue-600 text-4xl font-semibold">
                <Link to="/">Aresuno</Link>
            </div>

            {user.name ? (
                <div className="flex gap-6 items-center">
                    <div className="text-base">
                        <Link to={`/${user.userType}/dashboard/`} className="flex items-center gap-2 cursor-pointer">
                            <img
                                src={user.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            {user.name}
                        </Link>
                    </div>
                    <div className="text-red-600 text-base cursor-pointer" onClick={async () => {
                        localStorage.removeItem("token")
                        dispatch(userLogout())
                        navigate("/")
                    }}>
                        Logout
                    </div>
                </div>
            ) : (
                <div className="flex gap-6">
                    <div className="text-blue-600 text-base">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="text-blue-600 text-base">
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
