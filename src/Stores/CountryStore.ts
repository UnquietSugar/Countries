import { observable, action } from 'mobx';
import { ICountriesByLanguage } from '../Interfaces/ICountriesByLanguage';
import { ICountry } from '../Interfaces/ICountry';
import CountryService from '../Services/CountryService';



export default class CountryStore {

  private countryService: CountryService;
  @observable public countries: ICountry[] = [];
  @observable public currentCountries: ICountry[] = [];
  @observable public langArray: string[] = [];
  @observable public currentLangArr: string[] = [];
  @observable public currentCountriesByLang: ICountriesByLanguage[] = [];

  constructor(_countryService: CountryService) {
    this.countryService = _countryService;
    this.getAllCountries();
  }

  @action private async getAllCountries() {
    this.countries = await this.countryService.getAllCountries();
    this.assignOriginalCountriesArray();
  }

  @action public assignOriginalCountriesArray() {
    this.currentCountries = this.countries;
  }

  @action public sortByName() {
    this.currentCountries = this.countries.sort((a: ICountry, b: ICountry) => a.name.common.localeCompare(b.name.common));
  }

  @action public sortByPopulation() {
    this.currentCountries = this.countries.sort((a: ICountry, b: ICountry) => a.population - b.population);
  }

  @action public sortByArea() {
    this.currentCountries = this.countries.sort((a: ICountry, b: ICountry) => a.area - b.area);
  }

  public findCountryWithSmallestArea() {
    return this.countries.reduce((a: ICountry, b: ICountry) => a.area < b.area ? a : b);
  }

  public findCountryWithBiggestArea() {
    return this.countries.reduce((a: ICountry, b: ICountry) => a.area > b.area ? a : b);
  }

  public async extractLanguageKeysToArray() {
    let arr: any[] = [];

    this.countries.forEach((c: ICountry) => {
      if (!!c.languages) {
        arr.push(Object.keys(c.languages))
      }
    })

    arr = arr.flat();

    this.langArray = [...new Set(arr)];
  }

  public async getCountriesByLanguage(page: number, itemsPerPage: number) {
    this.currentLangArr = this.langArray.slice(page * itemsPerPage, (itemsPerPage * page) + itemsPerPage);

    this.currentCountriesByLang = [];

    this.currentLangArr.forEach(async (lang: string, i: number) => {
      this.currentCountriesByLang.push(await this.countryService.getByLanguage(lang));
    })
  }

}