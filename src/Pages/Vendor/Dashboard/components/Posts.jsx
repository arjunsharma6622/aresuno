import React, { useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import ModalEdit from "./ModalEdit";
import SeeMore from "./SeeMore";

const Posts = ({ posts, businesses }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="overflow-x-auto">
      {showEditModal && (
        <ModalEdit onClose={() => setShowEditModal(false)} post={selectedPost} />
      )}
      <h1 className="text-2xl font-semibold mb-6">
        You have {posts.length === 0 ? "No" : posts.length} Posts
      </h1>
      {posts.length === 0 ? (
        <div className="">
          <button>Add Post</button>
        </div>
      ) : (
        <div className="min-w-full overflow-hidden">
          <table className="w-full table-auto">
            <thead className="">
              <tr className="bg-gray-300">
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post Id
                </th> */}
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
                  Last update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {businesses.map((business, topindex) =>
                business.posts.map((post, index) => (
                  <tr key={index}>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{post._id}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {business.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt="post"
                          className="h-10 object-cover rounded-md"
                        />
                      ) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap">
                      {/* <SeeMore text={post.description} maxWords={3} /> */}
                      {post.description.split(" ").slice(0, 3).join(" ")}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(post.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <FiEdit3
                          className="text-gray-600 w-5 h-5 cursor-pointer"
                          onClick={() => {
                            setSelectedPost({
                              ...post,
                              businessName: business.name,
                            });
                            setShowEditModal(true);
                          }}
                        />
                        <FiTrash2
                          className="text-red-500 w-5 h-5 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Posts;
