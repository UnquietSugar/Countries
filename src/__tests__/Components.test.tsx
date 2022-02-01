import { Provider } from 'mobx-react';
import renderer from 'react-test-renderer';
import App from '../App';
import { CountryService } from '../Services/CountryService';
import { CountryStore } from '../Stores/CountryStore';


const countryService = new CountryService();
const countryStore = new CountryStore(countryService);

describe('App.tsx tests', () => {

  it('should render App.tsx, and have two elements inside', () => {
    const tree: any = renderer.create(<Provider countryStore={countryStore}><App /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.length).toEqual(2);
  });


});