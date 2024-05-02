import React from "react";

const PropertyCard = ({ imageUrl, price, address }) => {
  return (
    <div className="flex justify-center">
      <div className="w-400">
        <div className="flex overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="flex h-40 w-40 items-center justify-center">
            <img
              className="h-full w-full object-cover"
              src={imageUrl}
              alt={address}
            />
          </div>
          <div className="flex flex-col justify-between p-4">
            <div>
              <h2 className="mb-2 text-xl font-semibold">${price}</h2>
              <p className="mb-4 text-gray-700">{address}</p>
            </div>
            {/* {propDetails?.map((param) => (
              <p className="font-bold text-gray-800">Param</p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
