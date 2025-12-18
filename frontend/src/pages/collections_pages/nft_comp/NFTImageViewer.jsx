// src/pages/collections/nft/NFTImageViewer.jsx
import React, { useState } from "react";

export default function NFTImageViewer({ image, name }) {
  const [zoom, setZoom] = useState(false);

  return (
    <div>
      <div className="relative bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full object-contain transition-transform duration-200 ${
            zoom ? "scale-105" : "scale-100"
          }`}
          style={{ maxHeight: "520px" }}
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setZoom((s) => !s)}
            className="px-2 py-1 bg-white/80 rounded hover:bg-white"
          >
            {zoom ? "Unzoom" : "Zoom"}
          </button>
          <button
            onClick={() => {
              // open in new tab (full view)
              window.open(image, "_blank");
            }}
            className="px-2 py-1 bg-white/80 rounded hover:bg-white"
          >
            Full
          </button>
        </div>
      </div>
    </div>
  );
}
