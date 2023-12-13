import React from 'react'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const categoriesFromState = useSelector(state => state.categories)
  return (
    <div>
        <div>
                <h1 className="text-2xl font-medium mb-5">Main Categories</h1>

                {


                    <table className=" table-auto ">
                        <thead>

                            <tr className="bg-gray-300">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SNo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total businesses</th>
                            </tr>

                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">

                            {
                                categoriesFromState.map((category, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{category.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{category.subcategories.length !== 0 ? category.subcategories.length : "no"}</td> 

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {category.subcategories.map((subcategory) => (
                                                <tr>{subcategory.name}</tr>
                                            ))}
                                        </td>    

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {category.subcategories.map((subcategory) => (
                                                <tr>{subcategory.businesses.length}</tr>
                                            ))}
                                        </td>                                       
                                   
                                    </tr>
                                ))
                            }

                        </tbody>




                    </table>
                }


            </div>
    </div>
  )
}

export default AdminHome