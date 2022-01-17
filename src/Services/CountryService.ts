import { ICountry } from '../Interfaces/ICountry';

export default class CountryService {

  private path: string = 'https://restcountries.com/v3.1/';

  public async getAllCountries() {
    const res = await fetch(this.path + 'all');
    const result = await res.json();

    return this.extractNeededKeys(result);
  };

  public async getByLanguage(lang: string) {
    const res = await fetch(this.path + `lang/${lang}`);
    const result = await res.json();
    const data = this.extractNeededKeys(result);
    const commonLang: string = data[0].languages[lang];

    return { data: data, lang: commonLang };
  };

  private extractNeededKeys(result: any) {
    const countries: ICountry[] = [];
    result.forEach((country: ICountry) => {
      const reducedCountry = { area: country.area, flags: country.flags, languages: country.languages, name: country.name, population: country.population, region: country.region };
      countries.push(reducedCountry);
    });

    return countries;
  };
};
