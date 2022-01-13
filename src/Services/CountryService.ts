export default class CountryService {

  private path: string = 'https://restcountries.com/v3.1/';

  public async getAllCountries() {
    const res = await fetch(this.path + 'all');
    return res.json();
  }

  public async getByLanguage(lang: string) {
    const res = await fetch(this.path + `lang/${lang}`);
    const data = await res.json()
    // const updated = { ...data }
    const commonLang: string = data[0].languages[lang];
    return { data: data, lang: commonLang };
  }
}