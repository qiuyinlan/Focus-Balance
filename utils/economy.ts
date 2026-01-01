
/**
 * Calculates current earning rate per second based on elapsed time and hourly wage.
 * Formula: Rate = (HourlyWage / 3600) * StartFactor * (GrowthFactor ^ minutes)
 */
export const calculateRatePerSecond = (seconds: number, hourlyWage: number): number => {
  const baseRatePerSecond = hourlyWage / 3600;
  
  // We start at 10% of the base hourly wage rate
  const startFactor = 0.1;
  
  // Growth factor per minute. 
  // At 1.08, the rate reaches roughly 100% of the hourly wage at 30 minutes.
  // After that, it starts to truly "explode".
  const growthPerMinute = 1.08; 
  const minutes = seconds / 60;
  
  return baseRatePerSecond * startFactor * Math.pow(growthPerMinute, minutes);
};

export const formatCurrency = (amount: number): string => {
  // Returns precision string for real-time feedback (2 decimal places)
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatTimeHighPrecision = (totalSeconds: number): string => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
