"use client";
import React from "react";
import Image from "next/image";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";

import calculateRealEstateInvestment, { millify } from "~/lib/property-calc";
import { Button } from "~/components/ui/button";

interface PropertyData {
  address: string;
  imgSrc: string;
  price: number;
  livingArea: number;
  rentZestimate: number;
  bedrooms: number;
  bathrooms: number;
  lotAreaValue: number;
}

interface HousingCardHorizontalProps {
  price: number;
  rentEst: number;
  downPayment: number;
  interestRate: number;
  addCost: number;
  livingArea: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  lotAreaValue: number;
}

const HousingCardHorizontal = ({
  downPayment,
  interestRate,
  addCost,
  price,
  rentEst,
  livingArea,
  address,
  bathrooms,
  bedrooms,
  lotAreaValue,
}: HousingCardHorizontalProps) => {
  const priceString = millify(price);
  const rentEstString = millify(rentEst);
  const cashFlow = calculateRealEstateInvestment(
    price,
    downPayment,
    interestRate,
    rentEst,
    addCost,
  );
  const cashFlowString = millify(cashFlow.monthlyCashFlow.toFixed());
  const capRate = cashFlow.capitalizationRate * 100;

  const houseImages = ["/house-example1.jpg", "/house-example2.jpg", "/house-example3.jpg"]

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg bg-slate-50 shadow-md  md:h-48 md:flex-row ">
      {/* <Checkbox className="absolute m-2" /> */}
      <Image
        src={houseImages[Math.floor(Math.random() * 3)]}
        height={256}
        width={256}
        content="cover"
        loading="lazy"
        priority={false}
        alt={address}
        style={{ objectFit: "cover; " }}
        className="  "
      />
      <div className="mx-2 flex w-full flex-col justify-between p-4 md:flex-row">
        <div className="flex h-full flex-col justify-between">
          <h3 className="mb-4 text-xl font-semibold">{address}</h3>
          <div className="flex flex-grow flex-col justify-between">
            <ul className="flex justify-between ">
              <li className="flex flex-col items-center">
                <strong className="text-sm">Rent Est</strong>
                {rentEstString == "No Suggested Rent"? <p>{rentEstString}</p> : <p>{rentEstString}/m</p>}
              </li>
              <li className="flex flex-col items-center">
                <strong className="text-sm">Cash Flow</strong>
                <p>{cashFlowString}/m</p>
              </li>
              <li className="flex flex-col items-center">
                <strong className="text-sm">Cap Rate</strong>
                <p>{capRate.toFixed(1)}%</p>
              </li>
            </ul>

            <div className="flex gap-2 text-sm">
              <Badge variant={"secondary"}>bd: {bedrooms}</Badge>
              <Badge variant={"secondary"}>br: {bathrooms}</Badge>
              <Badge variant={"secondary"}>
                living: {livingArea.toLocaleString()}sqft
              </Badge>
              <Badge variant={"secondary"}>
                lot: {lotAreaValue.toLocaleString()}sqft
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold ">{priceString}</h5>
        </div>
      </div>
    </div>
  );
};

export default HousingCardHorizontal;
