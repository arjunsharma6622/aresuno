import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { FiCamera, FiEdit3, FiX } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";

export default function EditModal({ categoryId, subCategory, onClose, mainCategory }) {
  const [open, setOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const editUrl = subCategory ? `https://aresuno-server.vercel.app/api/category/updatesubcategory/${categoryId}/${subCategory._id}` : `https://aresuno-server.vercel.app/api/category/${mainCategory._id}`;
  // const editUrl = subCategory ? `http://localhost:8000/api/category/updatesubcategory/${categoryId}/${subCategory._id}` : `http://localhost:8000/api/category/${mainCategory._id}`;

  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);

  const [subCategoryToEdit, setSubCategoryToEdit] = useState(subCategory);
  const [mainCategoryToEdit, setMainCategoryToEdit] = useState(mainCategory);

  console.log(`SubCategoryToEdit is`)
  console.log(subCategoryToEdit)
  // console.log(`MainCategoryToEdit is` + mainCategoryToEdit)
  

  console.log(`The cat is ${subCategory ? subCategory.name : mainCategory.name}`)

  const handleImageChange = (e) => {
    setImageToUpdate(e.target.files[0])
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImageToShow(imageUrl);
  }

  const handleImageUpload = async () => {
    try{
      const imageData = new FormData()
      imageData.append('file', imageToUpdate)
      imageData.append("upload_preset", "ml_default")
      imageData.append("folder", "aresuno/category")

      const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload", imageData)
      const imageUrl = uploadResponse.data.secure_url

      return imageUrl
    }
    catch(err){
      console.log(err)
    }
  }

  const handleMainCategoryUpdate = async () => {
    try {
      setIsUpdating(true);
      const res = await axios.put(editUrl, mainCategoryToEdit );
      console.log(res);
      toast.success("Main Category Updated");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleSubCategoryUpdate = async () => {
    try {
      setIsUpdating(true);
      let imageUrl = ''
      let subCatToEdit = {}

      if(imageToUpdate){
        imageUrl = await handleImageUpload()
        subCatToEdit = {
          ...subCategoryToEdit,
          image: {
            ...subCategoryToEdit.image,
            url: imageUrl
          }
        }
      }
      else{
        subCatToEdit = {
          ...subCategoryToEdit,
          image: {
            ...subCategoryToEdit.image
          }
        }
      }

      console.log('sub cat to edittt')
      console.log(subCategoryToEdit);

      const res = await axios.put(editUrl, subCatToEdit );
      console.log(res);
      toast.success("Sub Category Updated");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };





  const handleCancel = () => {
    // Perform cancel operations here
    setIsUpdating(false); // Reset deleting state
    onClose(); // Close the modal
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-[40%]">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <FiEdit3 className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">
                Edit
                <span className="font-bold underline"> {subCategory? subCategory.name : mainCategory.title }</span>{" "}
                Category
              </h3>
            </div>
            <div className="mt-8 flex items-start gap-2 flex-col w-[80%] m-auto justify-center">

{ subCategoryToEdit &&
<div className="flex items-center gap-2 relative">
  <img src={imageToShow ? imageToShow : subCategoryToEdit.image?.url} alt="" className=" w-60 rounded-md"/>
  <label htmlFor="subCategoryImage" className="cursor-pointer absolute bottom-1 right-1 bg-blue-500 p-[6px] rounded-full">
    <BsFillCameraFill className="h-5 w-5 text-white"/>
  <input type="file" id="subCategoryImage" className="hidden" onChange={handleImageChange}/>
  </label>
  { imageToUpdate &&
  <div className="absolute cursor-pointer top-1 right-1 bg-red-200 rounded-full p-[2px]" onClick={() => {setImageToUpdate(null); setImageToShow(null)}}>
  <FiX className="h-4 w-4 text-red-500 "/>
  </div>
}
</div>

}


{subCategoryToEdit ? 

<div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="subCategoryName">Name</label>
    <input type="text" id="subCategoryName" value={subCategoryToEdit.name} onChange={e => setSubCategoryToEdit({...subCategoryToEdit, name: e.target.value})} className="text-base w-full border border-gray-300 p-2 rounded-md"/>
    </div>
    :
<div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="mainCategoryName">Name</label>
    <input type="text" id="mainCategoryName" value={mainCategoryToEdit.title} onChange={e => setMainCategoryToEdit({...mainCategoryToEdit, title: e.target.value})} className="text-base w-full border border-gray-300 p-2 rounded-md"/>
    </div>
  }

{
  subCategoryToEdit && 

<div className="w-full flex flex-col gap-1 text-sm">
  <label htmlFor="altTag">Image Alt Tag</label>

  <input type="text" id="altTag" value={subCategoryToEdit.image.altTag} className="text-base w-full border border-gray-300 p-2 rounded-md"/>
  </div>
}


</div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={subCategory ? handleSubCategoryUpdate : handleMainCategoryUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
