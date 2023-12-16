import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit2, FiEdit3, FiImage, FiPlus, FiTrash2, FiUpload, FiUploadCloud, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const CategoryInput = ({ index, onRemove, onImageChange, onUpdateCategory, onUpdateCategoryImageAltTag, onCategoryIdChange }) => {
    const [category, setCategory] = useState({ categoryId : '', name: '', image: { url: null, altTag: "" } });
    const [imageToShow, setImageToShow] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (e.target.files[0].size > 1 * 1000 * 1024) {
            // console.log("File with maximum size of 1MB is allowed");
            toast.error(`File with maximum size of 1MB is allowed, your size is ${(e.target.files[0].size / 1000 / 1024).toFixed(2)} MB`);
            return false;
          }
          else{
        const imageUrl = URL.createObjectURL(file);
        setCategory((prevCategory) => ({ ...prevCategory, image: { ...prevCategory.image, url: file } }));
        setImageToShow(imageUrl);
        onImageChange(index, file);}
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


const AllCategories = () => {

    const categories = useSelector(state => state.categories)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState(null);
    const [selectedMainCategoryToEdit, setSelectedMainCategoryToEdit] = useState(null);

    console.log('Selected category', selectedCategory)


    const groupedCategories = {};
    categories.forEach((category) => {
      if (category.title) {
        if (!groupedCategories[category.title]) {
          groupedCategories[category.title] = [];
        }
        groupedCategories[category.title].push(category);
      }
    });


    return (

        <div className="flex flex-col gap-10">





        <div>
        <h1 className="text-2xl font-medium mb-5">Sub Categories</h1>
  
        {categories.map((category, index) => (

            category.subcategories.length > 0 &&

            
          <div key={index} className="mb-8">
            {category.title && <h2 className="text-lg font-semibold mt-4 mb-2">{category.title}</h2>}
  
            <div className="mt-2 rounded-xl grid grid-cols-4 gap-4">
              {category.subcategories.map((subCategory, index) => (
                <div key={index} className="bg-white relative shadow rounded-xl p-5 py-6 flex justify-between items-center">
                  <div className="justify-start flex gap-10 items-center">
                    {/* <div className="w-24 h-24">
                      <img src={subCategory.image?.url} alt={subCategory.image?.altTag} className="rounded-lg w-full h-full object-cover" />
                    </div> */}
                    <div >
                        <div>
                            <img src={subCategory.icon} alt="" className='w-10 h-10'/>
                        </div>
                      <h2 className="text-sm font-base mt-1">{subCategory.name}</h2>
                    </div>
                  </div>
  
                  <div className="flex flex-col justify-start gap-2">
                  <FiEdit3 className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setSelectedCategoryToEdit(subCategory)} />
                  {selectedCategoryToEdit && selectedCategoryToEdit._id === subCategory._id && (
                      <EditModal categoryId={category._id} subCategory={selectedCategoryToEdit} onClose={() => setSelectedCategoryToEdit(null)} />
                    )}

                    <FiTrash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => setSelectedCategory(subCategory)} />
                    {selectedCategory && selectedCategory._id === subCategory._id && (
                      <DeleteModal categoryId={category._id} subCategory={selectedCategory} onClose={() => setSelectedCategory(null)} />
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>




                    



        ))}
      </div>



      <div>
      <h1 className="text-2xl font-medium mb-5">Category Titles</h1>

      <div className='relative grid grid-cols-4 gap-4'>
      {categories.map((category, index) => (
        <div key={index} className=' flex flex-col items-start justify-start gap-4 bg-white px-5 py-6 rounded-lg'>
            <h2 className="text-md font-base">{category.title}</h2>
            <div className=' flex items-center justify-center gap-4'>
            <FiEdit3 className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setSelectedMainCategoryToEdit(category)} />
            {selectedMainCategoryToEdit && selectedMainCategoryToEdit._id === category._id && (
                      <EditModal categoryId={category._id} mainCategory={selectedMainCategoryToEdit} onClose={() => setSelectedMainCategoryToEdit(null)} />
                    )}
            <FiTrash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => setSelectedMainCategory(category)} />


            {selectedMainCategory && selectedMainCategory._id === category._id && (
                      <DeleteModal mainCategory={selectedMainCategory} onClose={() => setSelectedMainCategory(null)} />
                    )}

            </div>
        </div>
      ))}

</div>

      </div>


      </div>
    );
};

const Category = () => {
    const [categories, setCategories] = useState([{ categoryId : '', name: '', image: { url: null, altTag: "" } }]);



    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);


    const [newCategoryTitle, setNewCategoryTitle] = useState('');







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





    console.log('categories')
    console.log(categories)
    const uploadAllCategoryImages = async () => {
        setIsCategoryLoading(true);

        var imgUrls = [];

        try {
            const uploadPromises = categories.map(async (category) => {

                try{
                if (category.image.url) {
                    const img = category.image.url;
                    const imageData = new FormData();
                    imageData.append('file', img);
                    imageData.append('upload_preset', 'ml_default');
                    imageData.append('folder', 'aresuno/category');

                    const uploadResponse = await axios.post(
                        'https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload',
                        imageData,
                    );

                    const imageUrl = uploadResponse.data.secure_url;
                    imgUrls.push(imageUrl);
                    return { ...category, image: { url: imageUrl, altTag: category.image.altTag } };
                }
                return category;

            }
            catch(err){
                console.log("some err : ", err.response.data.error.message);
                toast.error(err.response.data.error.message);
            }
            });

            await Promise.all(uploadPromises);
            console.log('xxx')

            return imgUrls; // Return the array of image URLs
        } catch (error) {
            console.log(error);
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

    const categoriesFromState = useSelector(state => state.categories)



    return (
        <div className='flex flex-col gap-4'>












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


            <AllCategories />





        </div>
    );
};

export default Category;
