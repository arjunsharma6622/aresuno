import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../../userSlice";
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [focusedField, setFocusedField] = useState(null);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://aresuno-server.vercel.app/api/login",
        formData
      );

      const token = res.data.token
      localStorage.setItem("token", token)

      dispatch(userLogin({ name: res.data.user.name, userType: res.data.userType }))


      console.log(res.data);
      toast.success("Logged In Successfully");
      navigate(`/${res.data.userType}/dashboard/`);
    } catch (err) {
      toast.error("Login Failed");
    }
    setIsLoading(false);
  };


  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className=" flex items-center justify-center h-screen">
      <section className="w-full max-w-md">
        <div className={` login w-full`}>
          <div className="shadow-lg w-full p-8 bg-white rounded-xl">
            <p className="text-3xl font-bold mb-6 text-center text-blue-500">Aresuno</p>

            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {/* <img src="" alt="logo" /> */}
            <form onSubmit={handleSubmit} className="w-full max-m-md">
              <div className="field input-field mb-4 relative">
                <span
                  className={`bg-white font-light pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3  text-base transition-all duration-75 ease-in ${(focusedField === "email" || formData.email) ? 'top-0 scale-90 text-blue-500' : 'text-gray-400 top-1/2  '
                    }`}

                  onFocus={handleFocus}
                  onBeforeInput={handleBlur}

                >
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg input border border-gray-300 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                />
                <img
                  src="./assets/images/mail.svg"
                  alt="mail"
                  className={`bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-600 w-5 h-5`}
                ></img>
              </div>





              <div className="field input-field mb-4 relative">
                <span
                  className={`bg-white font-light pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3  text-base transition-all duration-75 ease-in ${(focusedField === "password" || formData.password) ? 'top-0 scale-90 text-blue-500' : 'text-gray-400 top-1/2  '
                    }`}

                  onFocus={handleFocus}
                  onBeforeInput={handleBlur}

                >
                  Password
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="password input border border-gray-300 w-full py-3 rounded-lg px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                />

                <img
                  src={
                    !showPassword
                      ? "./assets/images/eye-off.svg"
                      : "./assets/images/eye.svg"
                  }
                  alt="eye"
                  className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-600 w-5 h-5"
                  onClick={() => setShowPassword(!showPassword)}
                ></img>
              </div>

              <div className="form-link text-center mb-4">
                <a href="#" className="forgot-pass text-blue-500">
                  Forgot password?
                </a>
              </div>

              <div className="field button-field">
                <button
                  className=" bg-blue-700 text-white font-bold w-full py-3  px-4 rounded-lg focus:outline-none"
                  type="submit"
                >
                  {isLoading ?
                    <div
                      class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span
                      >
                    </div>

                    : 'loading'}
                </button>
              </div>
            </form>

            <div className="form-link text-center mt-4">
              <span>
                Don't have an account?{" "}
                {/* <a href="#" className="link signup-link text-blue-500">
                  Signup
                </a> */}
                <Link to="/signup" className="link text-blue-500 underline">Signup</Link>
              </span>
            </div>

            <div className="line h-[1.4px] w-full mt-9 mb-9 bg-gray-300 relative">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-sm font-light">
                Or
              </span>
            </div>

            <div className="media-options mb-4">
              <a
                href="#"
                className="field facebook w-full flex items-center justify-center text-white  bg-[#1877F2] py-2 px-4 rounded focus:outline-none"
              >
                <img
                  src="./assets/images/facebook.svg"
                  alt=""
                  className="bx bxl-facebook facebook-icon text-blue-500 rounded-full flex items-center justify-center w-8 h-8 mr-2"
                ></img>
                <span>Login with Facebook</span>
              </a>
            </div>

            <div className="media-options">
              <a
                href="#"
                className="field google w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded focus:outline-none"
              >
                <img
                  src="./assets/images/google.svg"
                  alt=""
                  className="google-img h-8 w-8 object-cover mr-2"
                />
                <span>Login with Google</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
