interface IRealEstateInvestmentResults {
  downPayment: number;
  annualLoanPayment: number;
  grossScheduledIncome: number;
  grossOperatingIncome: number;
  annualDepreciation: number;
  annualNetOperatingIncome: number;
  taxableIncome: number;
  tax: number;
  actualProfitEarned: number;
  capitalizationRate: number;
  expectedAnnualAppreciation: number;
  totalReturn: number;
}

export default function calculateRealEstateInvestment(
  price: number,
  downPayment: number,
  interestRate: number,
  monthlyRent: number,
  hoaDues: number,
) {
  const loanAmount = price - downPayment;
  const monthlyInterestRate = (interestRate / 100) / 12;
  const loanTermMonths = 30 * 12; // 30 years

  // Monthly loan payment, calculated using the formula for annuities
  const monthlyLoanPayment = monthlyInterestRate * loanAmount / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

  // Gross Scheduled Income (GSI) is simply the annual sum of the monthly rents
  const grossScheduledIncome = monthlyRent * 12;
  
  // Gross Operating Income (GOI) is GSI minus HOA dues
  const grossOperatingIncome = grossScheduledIncome - hoaDues;

  // Depreciation is calculated over 27.5 years as per IRS guidelines
  const annualDepreciation = price / 27.5;

  // Net Operating Income (NOI) is GOI minus annual loan payment and depreciation
  const annualNetOperatingIncome = grossOperatingIncome - monthlyLoanPayment * 12 - annualDepreciation;

  // Taxable income is NOI minus depreciation
  const taxableIncome = annualNetOperatingIncome - annualDepreciation;

  // Assuming a flat tax rate of 25%
  const tax = taxableIncome * 0.25;

  // Actual profit is NOI minus tax
  const actualProfitEarned = annualNetOperatingIncome - tax;

  // Monthly Cash Flow
  const monthlyCashFlow = (grossOperatingIncome / 12) - monthlyLoanPayment -  (tax / 12);

  // Capitalization Rate
  const capitalizationRate = annualNetOperatingIncome / price;

  // Expected annual appreciation
  const expectedAnnualAppreciation = price * 0.02;

  // Total Return
  const totalReturn = (expectedAnnualAppreciation + actualProfitEarned) / downPayment;

  return {
    downPayment,
    annualLoanPayment: monthlyLoanPayment * 12,
    grossScheduledIncome,
    grossOperatingIncome,
    annualDepreciation,
    annualNetOperatingIncome,
    taxableIncome,
    tax,
    actualProfitEarned,
    monthlyCashFlow,
    capitalizationRate,
    expectedAnnualAppreciation,
    totalReturn,
  };
}

export const millify = (num: number) => {
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M';
  } else {
    return '$' + num.toLocaleString();
  }
};



