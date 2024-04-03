// import React, { useEffect, useRef, useState } from 'react';

// const MapComponent = ({ coordinates, businessDetails, setBusinessDetails }) => {
//   const mapRef = useRef(null);
//   const [marker, setMarker] = useState(null); // Using React state for marker
//   const [isDone, setIsDone] = useState(false);

//   useEffect(() => {
//     // Initialize the map
//     const google = window.google;
//     const map = new google.maps.Map(mapRef.current, {
//       center: { lat: coordinates.lat, lng: coordinates.lng },
//       zoom: 18,
//     });

//     // Add marker
//     const newMarker = new google.maps.Marker({
//       position: { lat: coordinates.lat, lng: coordinates.lng },
//       map: map,
//       draggable: true,
//     });

//     // Set the marker using useState
//     setMarker(newMarker);

//     // Event listener for dragging the marker
//     google.maps.event.addListener(newMarker, 'dragend', function (event) {
//       console.log('New position:', event.latLng.lat(), event.latLng.lng());
//     });
//   }, [coordinates]);

//   const handleDone = () => {
//     if (marker) { // Check if marker exists
//       setBusinessDetails({
//         ...businessDetails,
//         address: {
//           ...businessDetails.address,
//           coordinates: [marker.getPosition().lng(), marker.getPosition().lat()],
//         },
//       });

//       setIsDone(true);

//       console.log('Final position:', marker.getPosition().lat(), marker.getPosition().lng());
//     } else {
//       console.error('Marker is not initialized.');
//     }
//   };

//   return (
//     <div>
//       <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
//       { !isDone &&
//       <button onClick={handleDone} className='bg-blue-500 w-full mt-4 text-white py-2 px-4 rounded-md'>Done</button>
// }
//     </div>
//   );
// };

// export default MapComponent;

import { useEffect, useRef, useState } from "react";

const MapComponent = ({ businessDetails, setBusinessDetails }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const google = window.google;
    const initialCoordinates = businessDetails?.address?.coordinates;

    const map = new google.maps.Map(mapRef.current, {
      center: {
        lat: parseFloat(initialCoordinates[1]),
        lng: parseFloat(initialCoordinates[0]),
      },
      zoom: 16,
    });

    const newMarker = new google.maps.Marker({
      position: {
        lat: parseFloat(initialCoordinates[1]),
        lng: parseFloat(initialCoordinates[0]),
      },
      map: map,
      draggable: true,
    });

    setMarker(newMarker);

    google.maps.event.addListener(newMarker, "dragend", function (event) {
      const newCoords = [event.latLng.lng(), event.latLng.lat()];
      setBusinessDetails({
        ...businessDetails,
        address: {
          ...businessDetails.address,
          coordinates: newCoords,
        },
      });
    });
  }, [businessDetails.address.coordinates]);

  return (
    <div>
      <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
