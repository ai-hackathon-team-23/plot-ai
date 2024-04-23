import React from 'react'
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
 } from "@/components/ui/collapsible"
import { MyButton, ParameterCell } from './parameter-cell'


 type Props = {}

 const PARAMETER_LIST_DATA = [
    {
      section: "Property Details",
      parameters: [
        { value: "bathrooms", label: "Bathrooms", format: "number", functionality: () => {} },
        { value: "bedrooms", label: "Bedrooms", format: "number", functionality: () => {} },
        { value: "deckArea", label: "Deck Area", format: "size", functionality: () => {} },
        { value: "roomsCount", label: "Room Count", format: "number", functionality: () => {} },
        { value: "squareFeet", label: "Square Feet", format: "size", functionality: () => {} },
        { value: "stories", label: "Stories", format: "number", functionality: () => {} },
        { value: "unitsCount", label: "Unit Count", format: "number", functionality: () => {} },
        { value: "lotSquareFeet", label: "Lot Square Feet", format: "size", functionality: () => {} }
      ]
    },
    {
      section: "Financial Valuation",
      parameters: [
        { value: "pricePerSquareFoot", label: "Price Per Square Foot", format: "USD", functionality: () => {} },
        { value: "priorSaleAmount", label: "Prior Sale Amount", format: "USD", functionality: () => {} },
        { value: "assessedImprovementValue", label: "Assessed Improvement Value", format: "USD", functionality: () => {} },
        { value: "assessedLandValue", label: "Assessed Land Value", format: "USD", functionality: () => {} },
        { value: "assessedValue", label: "Assessed Value", format: "USD", functionality: () => {} },
        { value: "estimatedValue", label: "Estimated Value", format: "USD", functionality: () => {} },
        { value: "lastSaleAmount", label: "Last Sale Amount", format: "USD", functionality: () => {} }
      ]
    },
    {
      section: "Market Data",
      parameters: [
        { value: "suggestedRent", label: "Suggested Rent", format: "USD", functionality: () => {} },
        { value: "rentAmount", label: "Rent Amount", format: "USD", functionality: () => {} },
        { value: "medianIncome", label: "Median Income", format: "USD", functionality: () => {} },
        { value: "mlsListingPrice", label: "MLS Listing Price", format: "USD", functionality: () => {} }
      ]
    },
    {
      section: "Financial Status",
      parameters: [
        { value: "openMortgageBalance", label: "Open Mortgage Balance", format: "USD", functionality: () => {} },
        { value: "equityPercent", label: "Equity Percent", format: "percent", functionality: () => {} },
        { value: "estimatedEquity", label: "Estimated Equity", format: "USD", functionality: () => {} },
        { value: "yearsOwned", label: "Years Owned", format: "number", functionality: () => {} }
      ]
    }
  ]

export function ParameterList () {
 return (

    <div className="flex-none bg-white-200 overflow-y-auto shadow-lg">
       {PARAMETER_LIST_DATA.map( section => (
         <Collapsible defaultOpen={true} key={section.section}>
           <CollapsibleTrigger className="w-full bg-gray-300 font-bold py-2 px-4 rounded text-left">
                {section.section}
            </CollapsibleTrigger>
           <CollapsibleContent className="pl-4">
             {section.parameters.map(param => (
               <div key={param.value}  className="w-full hover:bg-gray-100">
                  <ParameterCell value={param.value} label={param.label} format={param.format}/>
               </div>
             ))}
           </CollapsibleContent>
         </Collapsible>
       ))}
   </div>
 )
}

