import React from "react";
import { FiTrash2 } from "react-icons/fi";

const Posts = ({ posts, businesses }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        You have {posts.length === 0 ? "No" : posts.length} Posts
      </h1>
      {posts.length === 0 ? (
        <div className="">
          <button>Add Post</button>
        </div>
      ) : (
        <table className="w-full table-auto">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PostId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {businesses.map((business, topindex) =>
              business.posts.map((post, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{post._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.image ? post.image : "No Image"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Posts;
