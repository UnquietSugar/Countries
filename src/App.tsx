import React, { FC, useState } from 'react';
import DataTable from './Components/DataTable';
import Loader from './Components/Loader';
import Navbar from './Components/Navbar';
import Summary from './Components/Summary';
import LangTable from './Components/LangTable';
import CountryStore from './Stores/CountryStore';
import { inject, observer } from 'mobx-react';
import { Box } from '@mui/system';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ICountry } from './Interfaces/ICountry';

interface IAppProps {
  countryStore?: CountryStore;
}

const App: FC<IAppProps> = inject('countryStore')(observer(({ countryStore }) => {
  const [sortIsDisabled, setSortIsDisabled] = useState<boolean>(false);

  const countries = countryStore?.countries as ICountry[]

  const countTable = () => {
    return (
      <Box padding={10}>
        {countries.length > 0 ?
          <>
            <DataTable setSortIsDisabled={setSortIsDisabled} />
            <Summary />
          </>
          :
          <Loader />}
      </Box>);
  };

  const langTable = () => {
    return (
      <Box padding={10}>
        {countries.length > 0 ?
          <LangTable setSortIsDisabled={setSortIsDisabled} />
          :
          <Loader />}
      </Box>
    )
  };


  return (

    <Router>
      <Navbar sortIsDisabled={sortIsDisabled} />
      <Routes>
        <Route path="/" element={countTable()} />
        <Route path="/lang-table" element={langTable()} />
      </Routes>
    </Router>

  );

}));


export default App;
