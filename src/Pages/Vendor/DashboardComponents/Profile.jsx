import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { FiCamera, FiEdit, FiEdit2, FiEye, FiEyeOff, FiLock, FiX } from "react-icons/fi";

const Profile = ({ user }) => {
  const [userEdit, setUserEdit] = useState(user);
  const [edit, setEdit] = useState(true);
  const [updatedPassword, setUpdatedPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        { password: updatedPassword.newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpdatedPassword({
        newPassword: "",
        confirmPassword: "",
      });
      console.log(res.data);
      toast.success("Password Updated");
    } catch (err) {
      console.log(err);
      toast.error("Error Updating Password");
    }
  };

  const handleChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUpdatedPassword({ ...updatedPassword, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        { name: userEdit.name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);
      toast.error("Error Updating Profile");
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-10">

      <div className="relative">
        <img
          src="https://picsum.photos/200"
          alt=""
          className="rounded-full w-32 h-32"
        />
        <div className="absolute bottom-1 -right-1 cursor-pointer">
        <div className="p-5 bg-blue-500 rounded-full w-7 h-7 relative">
          <BsFillCameraFill className="text-white w-5 h-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
        </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-8">
        <div className="w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Update Business Details</h2>
            {edit ? (
              <FiEdit
                className="text-gray-500 cursor-pointer w-6 h-6"
                onClick={() => {
                  setEdit(!edit);
                }}
              />
            ) : (
              <FiX
                className="text-red-500 cursor-pointer w-6 h-6"
                onClick={() => {
                  setEdit(!edit);
                }}
              />
            )}
          </div>

          <div className="">
            <form className={`flex flex-col gap-4 mt-6`}>
              <input
                type="text"
                value={userEdit.name}
                disabled={edit}
                className=" border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                onChange={handleChange}
                name="name"
                placeholder="Name"
              />
              <input
                type="text"
                value={userEdit.email}
                disabled
                className=" border-gray-400 text-gray-400 font-light cursor-not-allowed border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                onChange={handleChange}
                name="email"
                placeholder="Email"
              />
              <input
                type="text"
                value={userEdit.phone}
                disabled
                className=" border-gray-400 cursor-not-allowed border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                onChange={handleChange}
                name="phone"
                placeholder="Phone"
              />

              <button
                type="submit"
                className="bg-blue-500 rounded-sm py-2 px-5 text-white"
                onClick={handleProfileUpdate}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Change Password</h2>

            <FiLock className="text-gray-500 w-6 h-6" />
          </div>

          <div className="">
            <form className={`flex flex-col gap-4 mt-6`}>
              <div>
                <input
                  type="password"
                  value={updatedPassword.newPassword}
                  className="border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                  onChange={handlePasswordChange}
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={updatedPassword.confirmPassword}
                  className="border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                  onChange={handlePasswordChange}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />

                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FiEye
                      strokeWidth={1.5}
                      className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                    />
                  ) : (
                    <FiEyeOff
                      strokeWidth={1.5}
                      className="bx bx-show eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                    />
                  )}
                </div>
              </div>

              {updatedPassword.confirmPassword &&
                (updatedPassword.newPassword !==
                updatedPassword.confirmPassword ? (
                  <p className="text-red-500 text-xs italic">
                    Passwords do not match
                  </p>
                ) : (
                  <p className="text-green-500 text-xs italic">
                    Passwords Match
                  </p>
                ))}

              <button
                type="submit"
                className={`bg-blue-500 rounded-sm py-2 px-5 text-white ${
                  !updatedPassword.confirmPassword ||
                  updatedPassword.newPassword !==
                    updatedPassword.confirmPassword
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !updatedPassword.confirmPassword ||
                  updatedPassword.newPassword !==
                    updatedPassword.confirmPassword
                }
                onClick={handlePasswordClick}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
