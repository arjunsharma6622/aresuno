// import React, { useState } from 'react'
// import { FiPlus, FiX } from 'react-icons/fi';

// const AdminHome = () => {
//     const [image, setImage] = useState(null);
//     const [imageToShow, setImageToShow] = useState(null);
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setImageToShow(URL.createObjectURL(file))
//     }

//     return (
//         <div>

//             <div className="">
//                 <h2 className="text-2xl font-semibold mb-6">Banner</h2>

//                 <div>

//                 </div>
//             </div>

//             <div className="w-1/2">
//                 <h2 className="text-2xl font-semibold mb-6">Categories</h2>

//                 <div className='flex flex-col gap-5'>

//                     <label htmlFor="" className='flex flex-col gap-3'>
//                         Category Name
//                         <input type="text" className='border py-1 px-4 focus:outline-none' />
//                     </label>

// { !image &&
//                     <label htmlFor="categoryImage" className='flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl'>
//                         <div className='flex items-center gap-2'>
//                         <FiPlus className='w-6 h-6'/>
//                         Add Image
//                         </div>
//                         <input type="file" id='categoryImage' multiple={false} className='hidden' onChange={handleImageChange} />
//                     </label>

// }

//                     {
//                         image && (
//                             <div className='relative w-64'>
//                                 <img src={imageToShow} alt="" className='' />
//                                 <FiX
//                                     className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
//                                     onClick={() => {
//                                         setImage(null);
//                                         setImageToShow(null);
//                                     }}
//                                 />
//                             </div>
//                         )
//                     }


//                     <button className='bg-blue-600 rounded-xl text-white w-full py-2 px-5'>Add anoter</button>

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default AdminHome





// import React, { useState } from 'react';
// import { FiPlus, FiX } from 'react-icons/fi';

// const CategoryInput = ({ onRemove, onImageChange }) => {
//   const [categoryName, setCategoryName] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageToShow, setImageToShow] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setImageToShow(URL.createObjectURL(file));
//     onImageChange(file);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//         <label htmlFor="" className="flex flex-col gap-3">
//           Category Name
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             className="border py-1 px-4 focus:outline-none"
//           />
//         </label>
//         {onRemove && (
//           <button
//             onClick={onRemove}
//             className="text-red-500 hover:text-red-700 focus:outline-none"
//           >
//             Remove
//           </button>
//         )}
//       </div>

//       {!image && (
//         <label
//           htmlFor="categoryImage"
//           className="flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl"
//         >
//           <div className="flex items-center gap-2">
//             <FiPlus className="w-6 h-6" />
//             Add Image
//           </div>
//           <input
//             type="file"
//             id="categoryImage"
//             multiple={false}
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
//       )}

//       {image && (
//         <div className="relative w-64">
//           <img src={imageToShow} alt="" className="" />
//           <FiX
//             className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
//             onClick={() => {
//               setImage(null);
//               setImageToShow(null);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const AdminHome = () => {
//   const [categories, setCategories] = useState([{ id: 1 }]);

//   const addCategory = () => {
//     const newCategory = { id: Date.now() };
//     setCategories((prevCategories) => [...prevCategories, newCategory]);
//   };

//   const removeCategory = (categoryId) => {
//     setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId));
//   };

//   return (
//     <div>
//       {/* ... (Your existing code) ... */}

//       <div className="w-1/2">
//         <h2 className="text-2xl font-semibold mb-6">Categories</h2>

//         <div className="flex flex-col gap-5">
//           {categories.map((category, index) => (
//             <CategoryInput
//               key={category.id}
//               onRemove={() => removeCategory(category.id)}
//               onImageChange={(file) => {
//                 // Handle image change here if needed
//               }}
//             />
//           ))}
//           <button
//             onClick={addCategory}
//             className="bg-blue-600 rounded-xl text-white w-full py-2 px-5"
//           >
//             Add Another
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;






import axios from 'axios';
import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiUpload, FiUploadCloud, FiX } from 'react-icons/fi';

const CategoryInput = ({ onRemove, onImageChange, onUpdateCategory }) => {
    const [category, setCategory] = useState({ name: '', image: null });
    const [imageToShow, setImageToShow] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setCategory((prevCategory) => ({ ...prevCategory, image: file }));
        setImageToShow(imageUrl);
        onImageChange({ ...category, image: file });
    };

    const handleCategoryNameChange = (e) => {
        const categoryName = e.target.value;
        setCategory((prevCategory) => ({ ...prevCategory, name: categoryName }));
        onUpdateCategory(categoryName);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <label htmlFor="" className="flex flex-col gap-3">
                    Category Name
                    <input
                        type="text"
                        value={category.name}
                        onChange={handleCategoryNameChange}
                        className="border py-1 px-4 focus:outline-none"
                    />
                </label>
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        Remove
                    </button>
                )}
            </div>

            {!category.image && (
                <label
                    htmlFor="categoryImage"
                    className="flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl"
                >
                    <div className="flex items-center gap-2">
                        <FiPlus className="w-6 h-6" />
                        Add Image
                    </div>
                    <input
                        type="file"
                        id="categoryImage"
                        multiple={false}
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
            )}

            {category.image && (
                <div className="relative w-32">
                    <img src={imageToShow} alt="" className="w-32 h-32 object-cover rounded-xl" />
                    <FiX
                        className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                        onClick={() => {
                            setCategory((prevCategory) => ({ ...prevCategory, image: null }));
                            setImageToShow(null);
                            onImageChange({ ...category, image: null });
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const AdminHome = () => {
    const [categories, setCategories] = useState([{ name: '', image: null }]);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImageToShow, setBannerImageToShow] = useState(null);

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        setBannerImageToShow(URL.createObjectURL(file))
    }

    const addCategory = () => {
        setCategories((prevCategories) => [...prevCategories, { name: '', image: null }]);
    };

    const removeCategory = (index) => {
        setCategories((prevCategories) =>
            prevCategories.filter((_, i) => i !== index)
        );
    };

    const updateCategory = (index, categoryData) => {
        setCategories((prevCategories) =>
            prevCategories.map((cat, i) =>
                i === index ? { ...cat, ...categoryData } : cat
            )
        );
    };

    const handleBannerUpload = async () => {
        try{
            const imageData = new FormData()
            imageData.append('file', bannerImage)
            imageData.append("upload_preset", "ml_default")
            imageData.append("folder", "aresuno/banner")

            const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload", imageData)

            console.log(uploadResponse.data.secure_url)

            const bannerImageUrl = uploadResponse.data.secure_url

            return bannerImageUrl
        }
        catch(err){
            console.log(err)
        }


    }

    const handleBannerSubmit = async () => {

        const bannerImageUrl = await handleBannerUpload()
        console.log(bannerImageUrl)
    }

    console.log(bannerImage)


    console.log(categories)
    return (
        <div className='flex flex-col gap-4'>



            <div className=" bg-white p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Banner</h2>
                {!bannerImage && (
                    <label
                        htmlFor="bannerImage"
                        className="flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <FiPlus className="w-6 h-6" />
                            Add banner
                        </div>
                        <input
                            type="file"
                            id="bannerImage"
                            multiple={false}
                            className="hidden"
                            onChange={handleBannerImageChange}
                        />
                    </label>
                )}
                {bannerImage &&
                    <div className='relative'>
                        <img src={bannerImageToShow} alt=""
                            className="w-full h-auto object-cover aspect-[16/8] rounded-xl"
                        />
                        <div className='gradient-overlay-top rounded-xl'></div>
                        <div className='flex gap-4 absolute z-[10] items-center top-3 right-3'>
                            <div className='cursor-pointer p-3 rounded-full bg-white'>
                                <label htmlFor="bannerImageEdit" className='cursor-pointer'>
                                    <FiEdit2 className='text-2xl' />
                                    <input type="file" id="bannerImageEdit" className='hidden' onChange={handleBannerImageChange}/>
                                </label>
                            </div>

                            <div className='cursor-pointer p-3 rounded-full bg-white text-red-500' onClick={() => { setBannerImage(null); setBannerImageToShow(null) }}>
                                <FiX className='text-2xl'/>
                            </div>
                        </div>
                    </div>
                }

                { bannerImage &&

                    <button className="mt-2 py-2 px-4 bg-blue-500 flex gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleBannerSubmit}>
                        <FiUploadCloud className="w-6 h-6" />
                        Upload Banner
                    </button>

                }
            </div>






            <div className='flex gap-6'>

                <div className="w-1/2 bg-white p-5 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6">Categories</h2>

                    <div className="flex flex-col gap-5">
                        {categories.map((category, index) => (
                            <CategoryInput
                                key={index}
                                onRemove={() => removeCategory(index)}
                                onImageChange={(image) => updateCategory(index, { image })}
                                onUpdateCategory={(name) => updateCategory(index, { name })}
                            />
                        ))}
                        <button
                            onClick={addCategory}
                            className="bg-blue-600 rounded-xl text-white w-full py-2 px-5"
                        >
                            Add {categories.length > 0 ? 'Another' : 'New'}
                        </button>
                    </div>
                </div>

                <div className="w-1/2 bg-white p-5 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6">-</h2>
                </div>
            </div>



        </div>
    );
};

export default AdminHome;
