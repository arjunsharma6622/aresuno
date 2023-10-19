import { useState } from "react";

const LoginX = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" flex items-center justify-center  h-[85vh]">
      <section className="w-full max-w-md">
        <div className={` login w-full`}>
          <div className=" border-2 w-full p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form action="#">
              <div className="field input-field mb-4 relative">
                <input type="email" placeholder="Email" className="rounded-lg input border border-gray-300 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                <img src="./assets/images/mail.svg" alt="mail"  className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-600 w-5 h-5"></img>
              </div>

              <div className="field input-field mb-4 relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" className="password input border border-gray-300 w-full py-3 rounded-lg px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                <img src={!showPassword ? "./assets/images/eye-off.svg" : "./assets/images/eye.svg"} alt="eye"  className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-600 w-5 h-5"  onClick={() => setShowPassword(!showPassword)}></img>
              </div>

              <div className="form-link text-center mb-4">
                <a href="#" className="forgot-pass text-blue-500">Forgot password?</a>
              </div>

              <div className="field button-field">
                <button className=" bg-blue-700 text-white font-bold w-full py-3  px-4 rounded-lg focus:outline-none" type="submit">Login</button>
              </div>
            </form>

            <div className="form-link text-center mt-4">
              <span>Don't have an account? <a href="#" className="link signup-link text-blue-500">Signup</a></span>
            </div>
          

          <div className="line h-[1.4px] w-full mt-9 mb-9 bg-gray-300 relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-600">Or</span>
          </div>

          <div className="media-options mb-4">
            <a href="#" className="field facebook w-full flex items-center justify-center text-white  bg-[#1877F2] py-2 px-4 rounded focus:outline-none">
              <img src="./assets/images/facebook.svg" alt="" className="bx bxl-facebook facebook-icon text-blue-500 rounded-full flex items-center justify-center w-8 h-8 mr-2"></img>
              <span>Login with Facebook</span>
            </a>
          </div>

          <div className="media-options">
            <a href="#" className="field google w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded focus:outline-none">
              <img src="./assets/images/google.svg"   alt="" className="google-img h-8 w-8 object-cover mr-2" />
              <span>Login with Google</span>
            </a>
          </div>
        </div>

        </div>

      </section>
    </div>
  );
};

export default LoginX;
