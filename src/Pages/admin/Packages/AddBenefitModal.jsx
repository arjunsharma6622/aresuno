import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../../utils/util";

const AddBenefitModal = ({ selectedCategory, onSubmitCallback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isUpdating, setIsUpdating] = useState(false);

  const updatePackage = async (data) => {
    setIsUpdating(true);
    await axios.post(
      `${API_URL}/api/package/benefits/create`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    setIsUpdating(false);
    onSubmitCallback();
  };

  return (
    <>
      <div className="w-screen z-40 fixed top-0 left-0 h-screen backdrop-blur-sm bg-zinc-800/5">
        <form
          onSubmit={handleSubmit(updatePackage)}
          className="w-max flex flex-col gap-4 p-12 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl border border-zinc-700/10"
        >
          <div>
            <p className="font-medium text-base">Name</p>
            <input
              className="text-base w-full border border-gray-300 p-2 rounded-md"
              type="text"
              {...register("name", {
                required: true,
                maxLength: 40,
                minLength: 3,
              })}
            />
            {errors.name && (
              <p className="text-xs ml-1 text-red-600">Invalid name</p>
            )}
          </div>

          <div>
            <p className="font-medium text-base">Category</p>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center justify-center">
                <input
                  {...register("category", { required: true })}
                  type="radio"
                  value="service"
                  checked={selectedCategory === "service"}
                  id="field-service"
                />
                <p>Service</p>
              </div>

              <div className="flex gap-2 items-center justify-center">
                <input
                  {...register("category", { required: true })}
                  type="radio"
                  value="doctor"
                  id="field-doctor"
                  checked={selectedCategory === "doctor"}
                  className="pl-2"
                />
                <p>Doctor</p>
              </div>

              <div className="flex gap-2 items-center justify-center">
                <input
                  {...register("category", { required: true })}
                  type="radio"
                  value="manufacturer"
                  id="field-manufacturer"
                  checked={selectedCategory === "manufacturer"}
                  className="pl-2"
                />
                <p>Manufacturer</p>
              </div>
            </div>
            {errors.category && (
              <p className="text-xs ml-1 text-red-600">Select a category</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={onSubmitCallback}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBenefitModal;
