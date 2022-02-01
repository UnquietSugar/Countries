import React, { FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import CountryStore from '../Stores/CountryStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';
import styles from '../styles/styles';
import { countAveragePopulation } from '../Helpers/MathOperations';
import { ICountriesByLanguage } from '../Interfaces/ICountriesByLanguage';
import { ICountry } from '../Interfaces/ICountry';


interface ILangTableProps {
  countryStore?: CountryStore;
  setSortIsDisabled: (arg: boolean) => void;
}

const LangTable: FC<ILangTableProps> = inject('countryStore')(observer(({ countryStore, setSortIsDisabled }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    countryStore?.getCountriesByLanguage(page, rowsPerPage);
  }, [page, rowsPerPage, countryStore])

  useEffect(() => setSortIsDisabled(true));

  return (
    <>
      <TableContainer component={Paper} elevation={4} sx={styles.tableContainerSx} >
        <Table sx={styles.tableSx} aria-label="simple table">
          <TableHead >
            <TableRow color='secondary' >
              <TableCell ><Typography variant='h6'>Language</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>Countries</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>Population</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryStore?.currentCountriesByLang.map((countryArr: ICountriesByLanguage) => (
              <TableRow key={countryArr.lang} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell component="th" scope="row">{countryArr.lang || "Not Found"}</TableCell>
                <TableCell align="right" sx={{ wordBreak: 'break-word' }}>
                  {countryArr.data.map((country: ICountry) => `${country.name.common}; `)}
                </TableCell>
                <TableCell align="right" component="th" scope="row">{countAveragePopulation(countryArr.data)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={styles.paginationDiv}>
        <TablePagination
          count={countryStore?.langArray.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </div>
    </>
  );
}));

export default LangTable;