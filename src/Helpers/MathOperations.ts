export default class MathOperations {

  public toMillionsOrThousands(num: number) {
    let result: string = `${(num / 1000000).toFixed(1)}M`;
    if (num < 100000) result = `${(num / 1000000).toFixed(2)}M`;
    if (num < 10000) result = `${(num / 1000).toFixed()}K`;
    if (num < 1000) result = `<1K`;
    if (num < 1) result = '0'

    return result;
  }

  public toSqMiles(num: number) {
    return `${(num * 0.386102).toFixed().toString().replace('-', '')}`;
  }

  public countAveragePopulation(arr: any[]) {
    let num = 0;
    arr.forEach((country) => num += country.population);

    return `${(num / arr.length).toFixed(1)} ppl`;
  }

  public countLanguagepopulation(arr: any[]) {
    let num = 0;
    arr.forEach((country) => num += country.population);

    return Math.round(num);
  }

}