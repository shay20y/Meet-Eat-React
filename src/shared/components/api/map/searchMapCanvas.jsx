// import { OpenStreetMapProvider } from 'leaflet-geosearch';
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// import React, { useRef, useState } from 'react';

// export default function SearchMapCanvas() {
//   const [pos_ar, setPosAr] = useState([31.77793, 35.235286]);
//   const [key, setKey] = useState(2222);
//   const streetProvider = new OpenStreetMapProvider();
//   const searchRef = useRef();

//   const onSub = (e) => {
//     e.preventDefault();
//     doApiMapSearch();
//   };

//   const doApiMapSearch = async () => {
//     const input_val = searchRef.current.value;
//     console.log(input_val);
//     const data = await streetProvider.search({ query: input_val });
//     console.log(data);
//     setPosAr([data[0].y, data[0].x]);
//     setKey(Date.now());
//   };

//   const bounds = [
//     [31.775, 35.23], // Southwest coordinates
//     [31.78, 35.24]  // Northeast coordinates
//   ];

//   return (
//     <div className="container mx-auto h-screen py-8">
//       <h2 className="text-2xl font-bold mb-4">Search map:</h2>
//       <form onSubmit={onSub} className="flex items-center">
//         <label className="mr-2">Search:</label>
//         <input ref={searchRef} type="search" className="border border-gray-300 rounded px-2 py-1" />
//         <button className="ml-2 px-4 py-2  bg-main rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
//           Search
//         </button>
//       </form>
//       <div className="mt-8 h-full">
//         <MapContainer center={pos_ar} zoom={18} scrollWheelZoom={false} className="w-full h-full" bounds={bounds}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={pos_ar}>
//             <Tooltip>טול טיפ במעבר עכבר</Tooltip>
//             <Popup>
//               המיקום שחיפשת
//               <br />
//               <a href="https://monkeys.co.il" target="_blank" rel="noopener noreferrer">
//                 לביקור באתר
//               </a>
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }
