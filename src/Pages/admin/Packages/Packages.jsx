import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import EditPackageModal from "./EditPackageModal";
import axios from "axios";
import { API_URL } from "../../../utils/util";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState("");
  const [packagesData, setPackagesData] = useState([]);

  const fetchPackagesData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/package/getpackages`);
      setPackagesData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackagesData();
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

      <div className="grid grid-cols-auto-250 w-full gap-4">
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
              />
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
        />
      )}
    </div>
  );
};

export default Packages;
