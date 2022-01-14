import { mocked } from 'jest-mock';
import { CountryService } from '../Services/CountryService';
import { CountryStore } from '../Stores/CountryStore';

const mockCountriesArr = [
  { name: { common: 'c' }, population: 302, area: 7 },
  { name: { common: 'a' }, population: 121, area: 5 },
  { name: { common: 'b' }, population: 212, area: 6 },
];



jest.mock('../Services/CountryService', () => {
  return {
    CountryService: jest.fn().mockImplementation(() => {
      return {
        getAllCountries: () => mockCountriesArr,
        getByLanguage: () => [1],
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
})