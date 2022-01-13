import React, { FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import CountryStore from '../Stores/CountryStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';


interface ILangTableProps {
  countryStore?: CountryStore;
}

const LangTable: FC<ILangTableProps> = inject('countryStore')(observer(({ countryStore }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    countryStore?.extractLanguageKeysToArray();
    countryStore?.getCountriesByLanguage(page, rowsPerPage);
  }, [page, rowsPerPage])





  return (
    <TableContainer component={Paper} elevation={4} sx={{ display: 'flex', justifyContent: 'center', paddingY: 10 }} >
      <Table sx={{ maxWidth: 800, minWidth: 400 }} aria-label="simple table">
        <TableHead >
          <TableRow color='secondary' >
            <TableCell ><Typography variant='h6'>Language</Typography></TableCell>
            <TableCell align="right"><Typography variant='h6'>Countries</Typography></TableCell>
            <TableCell align="right"><Typography variant='h6'>Population</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryStore?.currentCountriesByLang.map((countryArr: any, i: number) => (
            <TableRow key={countryArr.lang} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">{countryArr.lang || "Not Found"}</TableCell>
              <TableCell align="right" sx={{ wordBreak: 'break-word' }}>
                {countryArr.data.map((country: any, i: number) => <span key={country.name.common + i}>{country.name.common}; </span>)}
              </TableCell>
              <TableCell align="right" component="th" scope="row">{countryStore?.countAveragePopulation(countryArr.data)}</TableCell>
            </TableRow>
          ))}
          <TablePagination
            sx={{ padding: 0 }}
            component="span"
            count={countryStore?.langArray.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}));

export default LangTable;