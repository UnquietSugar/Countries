

export const toMillionsOrThousands = (num: number) => {
  let result: string = `${(num / 1000000).toFixed(1)}M`;
  if (num < 95000) result = `${(num / 1000000).toFixed(2)}M`;
  if (num < 9500) result = `${(num / 1000).toFixed()}K`;
  if (num < 950) result = `<1K`;
  if (num < 1) result = '0'

  return result;
}

export const toSqMiles = (num: number) => {
  return `${(num * 0.386102).toFixed().toString().replace('-', '')}`;
}

export const countAveragePopulation = (arr: any[]) => {
  let num = 0;
  arr.forEach((country) => num += country.population);
  return `${(num / arr.length).toFixed(1)} ppl`;
}

export const countLanguagepopulation = (arr: any[]) => {
  let num = 0;
  arr.forEach((country) => num += country.population);
  return Math.round(num);
}

