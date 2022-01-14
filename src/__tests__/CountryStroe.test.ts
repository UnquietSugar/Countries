import { mocked } from 'jest-mock';
import { CountryService } from '../Services/CountryService';
import { CountryStore } from '../Stores/CountryStore';

const mockCountriesArr = [
  { name: { common: 'c' }, population: 302, area: 7, languages: { a: 'a' } },
  { name: { common: 'a' }, population: 121, area: 5, languages: { b: 'b', a: 'a' } },
  { name: { common: 'b' }, population: 212, area: 6, languages: { b: 'b', c: 'c' } },
];

jest.mock('../Services/CountryService', () => {
  return {
    CountryService: jest.fn().mockImplementation(() => {
      return {
        getAllCountries: () => mockCountriesArr,
        getByLanguage: (lang: string) => { return { lang: lang, data: mockCountriesArr }; },
      }
    })
  }
});

const MockedCountryService = mocked(CountryService, true);
let countryStore: CountryStore

describe('CountryService mock invokation', () => {
  it('should invoke CountryService class', () => {
    const countryService = new CountryService();
    expect(MockedCountryService).toHaveBeenCalledTimes(1);
  })
});

describe('CountryStore tests', () => {
  beforeAll(() => {
    MockedCountryService.mockClear();
  });

  it('should invoke CountryService and CountryStore, countryStore.countries !== []', async () => {
    const countryService = new CountryService();
    countryStore = await new CountryStore(countryService);
    expect(MockedCountryService).toHaveBeenCalledTimes(1);
    expect(countryStore.countries).toEqual(mockCountriesArr);
  });

  it('should countryStore.currentCountries should be equal countryStore.countries', () => {
    countryStore.assignOriginalCountriesArray();
    expect(countryStore.countries).toEqual(countryStore.currentCountries);
  });

  it('should sort by name', () => {
    countryStore.sortByName();

    expect(countryStore.currentCountries).toEqual([mockCountriesArr[1], mockCountriesArr[2], mockCountriesArr[0]]);
  });

  it('should sort by population', () => {
    countryStore.sortByPopulation();

    expect(countryStore.currentCountries).toEqual([mockCountriesArr[1], mockCountriesArr[2], mockCountriesArr[0]]);
  });

  it('should sort by area', () => {
    countryStore.sortByArea();

    expect(countryStore.currentCountries).toEqual([mockCountriesArr[1], mockCountriesArr[2], mockCountriesArr[0]]);
  });

  it('should return country with smallest area', () => {
    const res = countryStore.findCountryWithSmallestArea();

    expect(res).toEqual(mockCountriesArr[1]);
  });

  it('should return country with largest area', () => {
    const res = countryStore.findCountryWithBiggestArea();

    expect(res).toEqual(mockCountriesArr[0]);
  });

  it('countryStore.langArray should be arr of unique strings', () => {
    countryStore.extractLanguageKeysToArray();

    expect(countryStore.langArray).toEqual(['a', 'b', 'c'])
  });

  it('should return array of countries', async () => {
    await countryStore.getCountriesByLanguage(0, 1);

    expect(countryStore.currentCountriesByLang).toEqual([{ lang: mockCountriesArr[0].languages.a, data: mockCountriesArr }])
  });
})