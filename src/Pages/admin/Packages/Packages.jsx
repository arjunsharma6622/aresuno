import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import EditPackageModal from "./EditPackageModal";
import AddBenefitModal from "./AddBenefitModal";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { API_URL } from "../../../utils/util";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState("");
  const [packagesData, setPackagesData] = useState([]);

  const [benefitsData, setBenefitsData] = useState([]);
  const [showAddBenefitModal, setShowAddBenefitModal] = useState(false);

  const fetchPackagesData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/package/getpackages`);
      setPackagesData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPackageBenefitsData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/package/benefits/fetchAll`);
      setBenefitsData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBenefit = async (benefitId) => {
    await axios.delete(`${API_URL}/api/package/benefits/delete/${benefitId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchPackageBenefitsData();
  };

  useEffect(() => {
    fetchPackagesData();
    fetchPackageBenefitsData();
  }, []);

  return (
    <div className="w-full h-screen">
      {/* Rendering checkbox buttons */}

      <div className="flex gap-4">
        <div
          className={`rounded-md px-2 py-1 ${selectedCategory === "service" ? "bg-blue-400/10 border border-blue-300" : ""}`}
          onChange={() => setSelectedCategory("service")}
        >
          <input
            type="radio"
            id="service"
            value={"service"}
            checked={selectedCategory === "service"}
          />
          <label htmlFor="service" className="ml-2">
            Service
          </label>
        </div>
        <div
          className={`rounded-md px-2 py-1 ${selectedCategory === "doctor" ? "bg-blue-400/10 border border-blue-300" : ""}`}
          onChange={() => setSelectedCategory("doctor")}
        >
          <input
            type="radio"
            id="doctor"
            value={"doctor"}
            checked={selectedCategory === "doctor"}
          />
          <label htmlFor="doctor" className="ml-2">
            Doctor
          </label>
        </div>
        <div
          className={`rounded-md px-2 py-1 ${selectedCategory === "manufacturer" ? "bg-blue-400/10 border border-blue-300" : ""}`}
          onChange={() => setSelectedCategory("manufacturer")}
        >
          <input
            type="radio"
            id="manufacturer"
            value={"manufacturer"}
            checked={selectedCategory === "manufacturer"}
          />
          <label htmlFor="manufacturer" className="ml-2">
            Manufacturer
          </label>
        </div>
      </div>

      <h2 className="font-bold mt-6 mb-2 text-lg">Packages</h2>

      <div className="grid grid-cols-auto-150 w-full gap-4">
        {/* Rendering cards. */}
        {packagesData
          .filter((pkg) => pkg.category === selectedCategory)
          .map((pkg) => {
            return (
              <PackageCard
                key={pkg._id}
                pkg={pkg}
                editCallback={() => {
                  setEditingPackage(pkg);
                  setOpenEditModal(true);
                }}
              ></PackageCard>
            );
          })}
      </div>

      {openEditModal && (
        <EditPackageModal
          editingPackage={editingPackage}
          onSubmitCallback={() => {
            setOpenEditModal(false);
            fetchPackagesData();
          }}
        ></EditPackageModal>
      )}

      {/* Rendering packages benefits */}
      <div className="flex items-center mt-8 mb-2 gap-4">
        <h2 className="font-bold text-lg">Package benefits</h2>
        <button
          className="px-3 py-1 text-white bg-blue-500 rounded-md"
          onClick={() => setShowAddBenefitModal(true)}
        >
          Add
        </button>
      </div>
      <table className="w-full text-sm table-auto mb-9 border border-zinc-900/5">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {benefitsData
            .filter((benefit) => benefit.category === selectedCategory)
            .map((benefit) => {
              return (
                <tr key={benefit._id} className="group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {benefit.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(benefit.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {benefit.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FiTrash2
                      className="text-red-500 hover:bg-zinc-600/5 rounded-md p-2 group-hover:opacity-100 opacity-0 w-8 h-8 cursor-pointer"
                      onClick={() => {
                        deleteBenefit(benefit._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showAddBenefitModal && (
        <AddBenefitModal
          onSubmitCallback={() => {
            fetchPackageBenefitsData();
            setShowAddBenefitModal(false);
          }}
        ></AddBenefitModal>
      )}
    </div>
  );
};

export default Packages;
