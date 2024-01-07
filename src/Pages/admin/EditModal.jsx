import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { FiCamera, FiEdit3, FiX } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";

export default function EditModal({ category, onClose, categoryTitle }) {
  const [open, setOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  // const editUrl = category ? `https://aresuno-server.vercel.app/api/category/${category._id}` : `https://aresuno-server.vercel.app/api/category-title/${categoryTitle._id}`;
  // const editUrl = category ? `http://localhost:8000/api/category/${category._id}` : `http://localhost:8000/api/category-title/${categoryTitle._id}`;
  const editUrl = category ? `https://aresuno-server.vercel.app/api/category/${category._id}` : `http://localhost:8000/api/category-title/${categoryTitle._id}`;

  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);

  const [showOnHome, setShowOnHome] = useState(category ? category.showOnHome :  categoryTitle.showOnHome);

  const [icon, setIcon] = useState(null);
  const [iconToShow, setIconToShow] = useState(category ? category.icon : null);

  const [subCategoryToEdit, setSubCategoryToEdit] = useState(category);
  const [mainCategoryToEdit, setMainCategoryToEdit] = useState(categoryTitle);

  console.log(`SubCategoryToEdit is`)
  console.log(subCategoryToEdit)
  

  console.log(`The cat is ${category ? category.name : categoryTitle.title}`)

  const handleImageChange = (e) => {
    setImageToUpdate(e.target.files[0])
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImageToShow(imageUrl);
  }

  const handleIconChange = (e) => {
    setIcon(e.target.files[0])
    const iconUrl = URL.createObjectURL(e.target.files[0]);
    setIconToShow(iconUrl);
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

  const handleIconUpload = async () => {
    try{
      const iconData = new FormData()
      iconData.append('file', icon)
      iconData.append("upload_preset", "ml_default")
      iconData.append("folder", "aresuno/category")
        
        const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload", iconData)
        const iconUrl = uploadResponse.data.secure_url
  
        return iconUrl
      }
      catch(err){
        console.log(err)
      }
  }

  const handleMainCategoryUpdate = async () => {
    try {
      setIsUpdating(true);
      const res = await axios.put(editUrl, {...mainCategoryToEdit, showOnHome : showOnHome} );
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
      let iconUrl = ''
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
      
      if(icon){
        iconUrl = await handleIconUpload()
        subCatToEdit = {
          ...subCategoryToEdit,
          icon: iconUrl
        }
      }




      console.log('sub cat to edittt')
      console.log(subCatToEdit);


      const res = await axios.put(editUrl, {...subCatToEdit, showOnHome : showOnHome} );
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
                <span className="font-bold underline"> {category? category.name : categoryTitle.title }</span>{" "}
                Category
              </h3>
            </div>


            <div className="mt-8 flex items-start gap-2 flex-col w-[80%] m-auto justify-center">

{ subCategoryToEdit &&

<div className="flex justify-between items-end w-full">

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


<div className="flex items-center gap-2 relative">
  {iconToShow ? <img src={iconToShow ? iconToShow : subCategoryToEdit.icon} alt="" className=" w-20 rounded-md"/> : <span>Click on green cam to add icon</span>}
  <label htmlFor="subCategoryIcon" className="cursor-pointer absolute bottom-1 right-1 bg-green-500 p-[6px] rounded-full">
    <BsFillCameraFill className="h-5 w-5 text-white"/>
  <input type="file" id="subCategoryIcon" className="hidden" onChange={handleIconChange}/>
  </label>
  { icon &&
  <div className="absolute cursor-pointer top-1 right-1 bg-red-200 rounded-full p-[2px]" onClick={() => {setIcon(null); setIconToShow(null)}}>
  <FiX className="h-4 w-4 text-red-500 "/>
  </div>
}
</div>
</div>



}





{subCategoryToEdit ? 

<div className="w-full flex flex-col gap-4 text-sm">
  <div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="subCategoryName" className="font-medium text-base">Name</label>
    <input type="text" id="subCategoryName" value={subCategoryToEdit.name} onChange={e => setSubCategoryToEdit({...subCategoryToEdit, name: e.target.value})} className="text-base w-full border border-gray-300 p-2 rounded-md"/>
    </div>

  <div className="w-full flex flex-col gap-1 text-sm">
  <label htmlFor="altTag" className="font-medium text-base">Image Alt Tag</label>

  <input type="text" id="altTag" value={subCategoryToEdit.image.altTag} className="text-base w-full border border-gray-300 p-2 rounded-md" onChange={e => setSubCategoryToEdit({...subCategoryToEdit, image: {...subCategoryToEdit.image, altTag: e.target.value}})}/>
  </div>

  <div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="showOnHome" className="font-medium text-base">Show on Home Page</label>
    <div className="flex items-center gap-3 cursor-pointer">
      <input 
        type="radio" 
        name="showOnHome" 
        id="show" 
        value={true} 
        checked={showOnHome === true} 
        onChange={e => setShowOnHome(true)}
        className="cursor-pointer"
      />
      <label htmlFor="show">Show</label>
    </div>
    
    <div className="flex items-center gap-3 cursor-pointer">
      <input 
        type="radio" 
        name="showOnHome" 
        id="dontShow" 
        value={false} 
        checked={showOnHome === false} 
        onChange={e => setShowOnHome(false)}
        className="cursor-pointer"
      />
      <label htmlFor="dontShow">Don't Show</label>
    </div>
  </div>
    </div>
    :
<div className="w-full flex flex-col gap-4 text-sm">

  <div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="mainCategoryName" className="font-medium text-base">Name</label>
    <input type="text" id="mainCategoryName" value={mainCategoryToEdit.title} onChange={e => setMainCategoryToEdit({...mainCategoryToEdit, title: e.target.value})} className="text-base w-full border border-gray-300 p-2 rounded-md"/>
    </div>


    <div className="w-full flex flex-col gap-1 text-sm">
    <label htmlFor="showOnHome" className="font-medium text-base">Show on Home Page</label>
    <div className="flex items-center gap-3 cursor-pointer">
      <input 
        type="radio" 
        name="showOnHome" 
        id="show" 
        value={true} 
        checked={showOnHome === true} 
        onChange={e => setShowOnHome(true)}
        className="cursor-pointer"
      />
      <label htmlFor="show">Show</label>
    </div>
    
    <div className="flex items-center gap-3 cursor-pointer">
      <input 
        type="radio" 
        name="showOnHome" 
        id="dontShow" 
        value={false} 
        checked={showOnHome === false} 
        onChange={e => setShowOnHome(false)}
        className="cursor-pointer"
      />
      <label htmlFor="dontShow" >Don't Show</label>
    </div>
  </div>

    </div>
  }


</div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={category ? handleSubCategoryUpdate : handleMainCategoryUpdate}
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
