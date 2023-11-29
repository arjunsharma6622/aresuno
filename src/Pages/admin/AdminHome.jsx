import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit2, FiImage, FiPlus, FiUpload, FiUploadCloud, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CategoryInput = ({ index, onRemove, onImageChange, onUpdateCategory, onUpdateCategoryImageAltTag, onCategoryIdChange }) => {
    const [category, setCategory] = useState({ categoryId : '', name: '', image: { url: null, altTag: "" } });
    const [imageToShow, setImageToShow] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setCategory((prevCategory) => ({ ...prevCategory, image: { ...prevCategory.image, url: file } }));
        setImageToShow(imageUrl);
        onImageChange(index, file);
    };

    const onUpdateCategoryImageAltTagHandler = (e) => {
        const altTag = e.target.value;
        setCategory((prevCategory) => ({ ...prevCategory, image: { ...prevCategory.image, altTag } }));
        onUpdateCategoryImageAltTag(index, altTag);
    }

    const handleCategoryNameChange = (e) => {
        const categoryName = e.target.value;
        setCategory((prevCategory) => ({ ...prevCategory, name: categoryName }));
        onUpdateCategory(index, categoryName);
    };

    const handleCategoryIdChange = (e) => {
        const categoryId = e.target.value;
        setCategory((prevCategory) => ({ ...prevCategory, categoryId: categoryId }));
        onCategoryIdChange(index, categoryId);
    }

    const [categoryTitles, setCategoryTitles] = useState([])
    const fetchCategoryTitles = async () => {
        try {
            const res = await axios.get("https://aresuno-server.vercel.app/api/category/")
            console.log(res.data)
        // Extract title and _id fields and create a new array
        const extractedTitles = res.data.map((category) => ({
            title: category.title,
            _id: category._id,
        }));

        setCategoryTitles(extractedTitles);

        }
        catch (err) {
            
            console.log(err)
        }

    }

    useEffect(() => {
        fetchCategoryTitles()
    }, [])

    console.log(category)

    return (
        <div className="border rounded-xl p-5 py-6 relative justify-start flex gap-10 items-end">

            <div className='flex flex-col gap-5'>
            <div className="flex items-start gap-3 flex-col justify-between w-full">
                <label htmlFor="" className="flex flex-col gap-3">
                    Category Title
                    </label>


                    <select name="" id="" className='w-full bg-white rounded-sm border py-2 px-2' onChange={handleCategoryIdChange}>
                        <option value="" defaultChecked>-</option>
                        {
                            categoryTitles.map((category, index) => (
                                <option key={index} value={category._id}>{category.title}</option>
                            ))
                        }
                    </select>

            </div>

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

            <div className="flex items-center justify-between">
                <label htmlFor="" className="flex flex-col gap-3">
                    Describe your image (helps in SEO)
                    <input
                        type="text"
                        value={category.image.altTag}
                        onChange={onUpdateCategoryImageAltTagHandler}
                        className="border rounded-sm py-2 px-6 focus:outline-none"
                    />
                </label>

            </div>

            </div>

            {!category.image.url && (
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

            {category.image.url && (
                <div className="relative">
                    <img src={imageToShow} alt="" className=" w-20 h-20 object-cover rounded-xl" />
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

const AdminHome = ({categoriesData}) => {
    const [banner, setBanner] = useState({ image: { url: "" } });
    const [categories, setCategories] = useState([{ categoryId : '', name: '', image: { url: null, altTag: "" } }]);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImageToShow, setBannerImageToShow] = useState(null);


    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);


    const [newCategoryTitle, setNewCategoryTitle] = useState('');





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


    const updateCategoryName = (index, name) => {
        setCategories((prevCategories) =>
            prevCategories.map((cat, i) =>
                i === index ? { ...cat, name: name } : cat
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



    console.log('categories')
    console.log(categories)
    const uploadAllCategoryImages = async () => {
        setIsCategoryLoading(true);

        var imgUrls = [];

        try {
            const uploadPromises = categories.map(async (category) => {
                if (category.image.url) {
                    const img = category.image.url;
                    const imageData = new FormData();
                    imageData.append('file', img);
                    imageData.append('upload_preset', 'ml_default');
                    imageData.append('folder', 'aresuno/category');

                    const uploadResponse = await axios.post(
                        'https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload',
                        imageData
                    );

                    const imageUrl = uploadResponse.data.secure_url;
                    imgUrls.push(imageUrl);
                    return { ...category, image: { url: imageUrl, altTag: category.image.altTag } };
                }
                return category;
            });

            await Promise.all(uploadPromises);

            return imgUrls; // Return the array of image URLs
        } catch (err) {
            console.log(err);
            return []; // Return an empty array in case of an error
        } finally {
            setIsCategoryLoading(false);
        }
    };

    const handleAddCategories = async () => {
        const imgUrls = await uploadAllCategoryImages();

        try {
            const updatedCategories = categories.map((category, index) => {
                return { ...category, image: { url: imgUrls[index], altTag: category.image.altTag } };
            });

            const res = await axios.post("https://aresuno-server.vercel.app/api/category/addsubcategories", updatedCategories);
            console.log(res.data);
            toast.success("Categories added successfully");

            setIsCategoryLoading(false);
            setCategories([]);

        } catch (err) {
            setIsCategoryLoading(false);

            console.log(err);
            toast.error("Categories add failed");

        }
    };



    const createNewCategory = async () => {
        try{
            const res = await axios.post("https://aresuno-server.vercel.app/api/category/add", { title: newCategoryTitle })
            console.log(res.data)
            toast.success("Category created successfully")
            setNewCategoryTitle('')
        }
        catch(err){
            console.log(err)
            toast.error("Problem creating category")
            setNewCategoryTitle('')
            
        }

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






<div className='bg-white rounded-xl'>
            <div className='flex gap-4'>


            <div className="w-1/2 bg-white p-5 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6">Create Main category</h2>
                    {/* <div className='flex flex-col gap-4'>
                        {categoriesData.slice(-3).reverse().map((category, index) => (
                            <div key={index} className='flex gap-4 items-center'>
                                <div className='w-20 h-20'>
                                    <img src={category.image?.url} alt={category.image?.altTag} className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div>
                                    <h3 className='font-medium'>{category.name}</h3>
                                </div>
                            </div>
                            ))
                            }
                    </div> */}

                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            placeholder="Category Title"
                            className="border border-gray-300 p-3 rounded-xl focus:outline-none"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                        />

                        <div className="flex items-center gap-3">

                            <button
                                onClick={createNewCategory}
                                className="bg-blue-600 rounded-xl text-white w-fit py-2 px-5"
                            >Create</button>
                            </div>



                        </div>





                </div>

                <div className="w-[70%] bg-white p-5 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Add sub categories</h2>

                    <div className="flex flex-col gap-5">
                        {categories.map((category, index) => (
                            <CategoryInput
                                key={index}
                                index={index}
                                onRemove={() => removeCategory(index)}
                                onImageChange={(index, image) => updateCategory(index, {image : {...category.image, url : image}}) }
                                onUpdateCategory={(index, name) => updateCategoryName(index, name)}
                                onUpdateCategoryImageAltTag={(index, altTag) => updateCategory(index, { image: { ...category.image, altTag } })}
                                onCategoryIdChange={(index, categoryId) => updateCategory(index, { categoryId })}
                                
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
                        {
                            isCategoryLoading &&
                            <div
                                class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>

                        }

                        {
                            isCategoryLoading ? "Uploading..." : "Upload Categories"
                        }
                    </button>
                </div>


            </div>
            </div>



        </div>
    );
};

export default AdminHome;
