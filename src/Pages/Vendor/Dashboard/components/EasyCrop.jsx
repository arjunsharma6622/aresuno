// import { useCallback, useState } from "react";
// // import Slider from "@material-ui/core/Slider";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "./Crop";

// const EasyCrop = ({ image, setImage, aspectRatio, widthOfImg }) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const blobUrlToFile = async (url, fileName) => {
//     const res = await fetch(url);
//     const blob = await res.blob();
//     return new File([blob], fileName, { type: blob.type });
//   }

//   const showCroppedImage = useCallback(async () => {
//     try {
//       const croppedImage = await getCroppedImg(
//         image,
//         croppedAreaPixels,
//         rotation
//       );
//       console.log("donee", { croppedImage });
//       setCroppedImage(croppedImage);
//       const file = await blobUrlToFile(croppedImage, "crop.png");
//       console.log(file);
//     setImage(file);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [croppedAreaPixels, rotation, image]);

//   const onClose = useCallback(() => {
//     setCroppedImage(null);
//   }, []);

//   return (


//     <div className="flex flex-col gap-3 z-[40] fixed inset-0  items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">




//       <div
//         className="relative"
//         style={{
//           display: image === null || croppedImage !== null ? "none" : "block",
//         }}
//       >
//         <div className="flex justify-center w-64 h-64">
//           <Cropper
//             image={image}
//             crop={crop}
//             rotation={rotation}
//             zoom={zoom}
//             zoomSpeed={4}
//             maxZoom={3}
//             zoomWithScroll={true}
//             showGrid={true}
//             aspect={aspectRatio}
//             onCropChange={setCrop}
//             onCropComplete={onCropComplete}
//             onZoomChange={setZoom}
//             onRotationChange={setRotation}
//             classes={{
//               containerClassName: "rounded-xl"
//             }}

//           />
//         </div>

//       </div>


//       <div className="flex items-center gap-2">

//       <button
//         style={{
//           display: image === null || croppedImage !== null ? "none" : "block",
//         }}
//         className="bg-green-500 text-white py-2 px-4 rounded w-full"
//         onClick={showCroppedImage}
//       >
//         Done
//       </button>


//       </div>



//       {croppedImage && (
//       <div className=" flex flex-col items-start gap-3">
//         <div className="flex">
//           <img className={`rounded-lg ${widthOfImg}`} src={croppedImage} alt="cropped" />
//           </div>
//         <button onClick={onClose} className="bg-blue-500 w-full text-white py-2 px-4 rounded">Crop</button>
//       </div>

//       )}
//     </div>
//   );
// };

// export default EasyCrop;


import { useCallback, useState } from "react";
// import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";

const EasyCrop = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (


    <div className="flex flex-col gap-3">




      <div
        className="relative"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="flex justify-center w-64 h-64">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={1/1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            classes={{
              containerClassName: "rounded-xl"
            }}

          />
        </div>

      </div>

      <button
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={showCroppedImage}
      >
        Done
      </button>
      {croppedImage && (
      <div className=" flex flex-col items-start gap-3">
        <div className="flex">
          <img className="rounded-lg w-64" src={croppedImage} alt="cropped" />
          </div>
        <button onClick={onClose} className="bg-blue-500 w-full text-white py-2 px-4 rounded">Crop</button>
      </div>

      )}
    </div>
  );
};

export default EasyCrop;