import React, { useState } from "react";
import EasyCrop from "./EasyCrop";

const Leads = () => {
  const [imageToShow, setImageToShow] = useState(null);
  return <div>
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            setImageToShow(reader.result);
          };
          reader.readAsDataURL(file);
        }}
      />
    </div>

          <EasyCrop image={imageToShow || null} className="w-32 h-32 aspect-auto object-cover rounded-lg"/>
  </div>;
};

export default Leads;
