import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { FiCamera, FiEdit, FiEdit2, FiEye, FiEyeOff, FiLock, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [image, setImage] = useState(null);
  const [imageToShow, setImageToShow] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  useEffect(() => {
    setUserEdit(user);
  }, [user]);
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
        { password: updatedPassword?.newPassword },
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

  const handleImage = async () => {
    try{
      setIsImageUploading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", "aresuno/vendors");
      const res = await axios.post("https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload", imageData);
      console.log(res.data);
      const imageUrl = res.data.secure_url;
      return imageUrl;

    }
    catch(err){
      console.log(err);
    }
  }


  const handleImageUpload = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImage();

    try{
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        {
          image: imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Profile Image Updated");
      setIsImageUploading(false);
    }
    catch(err){
      console.log(err);
      toast.error("Error uploading image");
    }

  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();



    try {
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        {
          name: userEdit?.name
        },


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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageToShow(URL.createObjectURL(file));
  }

  return (
    <div className="w-full flex justify-center items-center flex-col gap-10">

      <div className="relative flex items-center flex-col">
        <img
          src={user.image&&!image ? user.image : image ? imageToShow : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt=""
          className="rounded-full w-32 h-32 object-cover"
        />
        {image ? 

          <div className="flex gap-2 mt-4">
            <button onClick={handleImageUpload} className="bg-blue-500 rounded-sm py-2 px-4 text-white">{isImageUploading ? "Uploading..." : "Upload"}</button>
            <button onClick={() => {setImage(null); setImageToShow(null)}} className="bg-red-500 rounded-sm py-2 px-4 text-white">Cancel</button>
          </div>
         :
        <div className="absolute bottom-1 -right-1 cursor-pointer">
        <label htmlFor="profileImage">

        <div className="p-5 bg-blue-500 cursor-pointer rounded-full w-7 h-7 relative">
          
          <input 
          type="file" 
          id="profileImage" 
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" 
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          />
          <BsFillCameraFill className="text-white cursor-pointer w-5 h-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
        </div>
        </label>

        </div>
}
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-8">
        <div className="w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Update Your Details</h2>
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
                value={userEdit?.name || ""}
                disabled={edit}
                className=" border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                onChange={handleChange}
                name="name"
                placeholder="Name"
              />
              <input
                type="text"
                value={userEdit?.email || ""}
                disabled
                className=" border-gray-400 text-gray-400 font-light cursor-not-allowed border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                onChange={handleChange}
                name="email"
                placeholder="Email"
              />
              <input
                type="text"
                value={userEdit?.phone || ""}
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
                  value={updatedPassword?.newPassword}
                  className="border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                  onChange={handlePasswordChange}
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={updatedPassword?.confirmPassword}
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

              {updatedPassword?.confirmPassword &&
                (updatedPassword?.newPassword !==
                updatedPassword?.confirmPassword ? (
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
                  !updatedPassword?.confirmPassword ||
                  updatedPassword?.newPassword !==
                    updatedPassword?.confirmPassword
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !updatedPassword?.confirmPassword ||
                  updatedPassword?.newPassword !==
                    updatedPassword?.confirmPassword
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
