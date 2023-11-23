import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit2, FiImage, FiPlus, FiUpload, FiUploadCloud, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
        <div className="border rounded-xl p-5 py-6 relative justify-start flex gap-10 items-end">
            <div className="flex items-center justify-between">
                <label htmlFor="" className="flex flex-col gap-3">
                    Category Name
                    <input
                        type="text"
                        value={category.name}
                        onChange={handleCategoryNameChange}
                        className="border rounded-sm py-2 px-6 focus:outline-none"
                    />
                </label>

            </div>

            {!category.image && (
                <label
                    htmlFor="categoryImage"
                    className="flex mb-2 flex-col gap-3 cursor-pointer text-gray-500"
                >
                    <div className="flex items-center gap-2">
                        <FiImage className="w-6 h-6" />
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
                <div className="relative">
                    <img src={imageToShow} alt="" className=" w-20 h-20 object-cover rounded-xl" />
                    {/* <FiEdit2
                        className="absolute -top-2 -right-2 w-6 h-6 text-black  cursor-pointer"
                        onClick={() => {
                            setCategory((prevCategory) => ({ ...prevCategory, image: null }));
                            setImageToShow(null);
                            onImageChange({ ...category, image: null });
                        }}
                    /> */}
                </div>
            )}


            {onRemove && (
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 absolute top-3 right-3 focus:outline-none"
                >
                    <FiX className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

const AdminHome = () => {
    const [banner, setBanner] = useState({ image: "" });
    const [categories, setCategories] = useState([{ name: '', image: null }]);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImageToShow, setBannerImageToShow] = useState(null);


    const [isLoading, setIsLoading] = useState(false);



    const fetchBanner = async () => {
        try {
            const res = await axios.get("https://aresuno-server.vercel.app/api/banner")
            const bannerUrl = res.data[0].image
            console.log(bannerUrl)
            // setBannerImage(bannerUrl)
            // setBannerImageToShow(bannerUrl)
            setBanner(res.data[0])
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchBanner()
    }, [])

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
        try {
            const imageData = new FormData()
            imageData.append('file', bannerImage)
            imageData.append("upload_preset", "ml_default")
            imageData.append("folder", "aresuno/banner")

            const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload", imageData)

            console.log(uploadResponse.data.secure_url)

            const bannerImageUrl = uploadResponse.data.secure_url

            return bannerImageUrl
        }
        catch (err) {
            console.log(err)
        }

    }


    console.log(banner._id)

    const handleBannerSubmit = async () => {

        setIsLoading(true)


        const bannerImageUrl = await handleBannerUpload()
        console.log(bannerImageUrl)

        try {
            const bannerData = {
                image: bannerImageUrl
            }

            if (banner.image) {
                const res = await axios.put(`https://aresuno-server.vercel.app/api/banner/${banner._id}`, { image: bannerImageUrl })
                console.log(res.data)
            }
            else {
                const res = await axios.post("https://aresuno-server.vercel.app/api/banner/add", bannerData)
                console.log(res.data)
            }

            setIsLoading(false)
            toast.success("Banner uploaded successfully")

        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
            toast.error("Banner upload failed")
        }
    }

    console.log(bannerImage)


    console.log(categories)


    const handleAddCategories = () => {
        
    }
    return (
        <div className='flex flex-col gap-4'>



            <div className=" bg-white p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Banner</h2>


                {(!bannerImage && !banner.image) && (
                    <label
                        htmlFor="bannerImage"
                        className="flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl mb-6"
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



                {(banner.image || bannerImage) &&
                    <div className='relative'>
                        <img src={bannerImageToShow ? bannerImageToShow : banner.image} alt=""
                            className="w-full h-auto object-cover aspect-[16/8] rounded-xl"
                        />
                        <div className='gradient-overlay-top rounded-xl'></div>
                        <div className='flex gap-4 absolute z-[10] items-center top-3 right-3'>
                            <div className='cursor-pointer p-3 rounded-full bg-white'>
                                <label htmlFor="bannerImageEdit" className='cursor-pointer'>
                                    <FiEdit2 className='text-2xl' />
                                    <input type="file" id="bannerImageEdit" className='hidden' onChange={handleBannerImageChange} />
                                </label>
                            </div>


                            {bannerImage &&
                                <div className='cursor-pointer p-3 rounded-full bg-white text-red-500' onClick={() => { setBannerImage(null); setBannerImageToShow(null) }}>
                                    <FiX className='text-2xl' />
                                </div>}
                        </div>
                    </div>


                }

                {bannerImage &&

                    <button className="mt-2 py-2 px-4 bg-blue-500 flex items-center gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleBannerSubmit}>
                        {
                            isLoading ?
                                <div
                                    class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status"
                                >
                                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div> : <FiUploadCloud className="w-6 h-6" />

                        }

                        {
                            isLoading ? "Uploading..." : "Upload Banner"
                        }

                    </button>

                }
            </div>






            <div className='flex gap-6'>

                <div className="w-[70%] bg-white p-5 rounded-xl">
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
                            className="bg-blue-600 rounded-xl text-white w-fit py-2 px-5"
                        >
                            Add {categories.length > 0 ? 'Another' : 'New'}
                        </button>
                    </div>

                    <button className="mt-6 text-center  w-full py-2 px-4 bg-blue-500 flex items-center justify-center gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleAddCategories}>
                        Add all categories
                    </button>
                </div>

                <div className="w-1/2 bg-white p-5 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6">-</h2>
                </div>
            </div>



        </div>
    );
};

export default AdminHome;
