import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';
import { CountryStore } from '../Stores/CountryStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar } from '@mui/material';

interface ISummaryProps {
  countryStore?: CountryStore;
}

const Summary: FC<ISummaryProps> = inject('countryStore')(observer(({ countryStore }) => {
  const smallestCountry = countryStore?.findCountryWithSmallestArea();
  const biggestCountry = countryStore?.findCountryWithBiggestArea();

  return (
    <TableContainer elevation={5} component={Paper} sx={{ display: 'flex', justifyContent: 'center', marginY: 5, paddingY: 10 }} >
      <Table sx={{ maxWidth: 700, minWidth: 400 }} aria-label="simple table">
        <TableHead >
          <TableRow color='secondary' >
            <TableCell ><Typography variant='h4'>Summary</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"><Typography variant='h6'>Average population per country:</Typography></TableCell>
            <TableCell align="right">{countryStore?.countAveragePopulation(countryStore?.countries)}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"><Typography variant='h6'>Smallest area:</Typography></TableCell>
            <TableCell align="right">{smallestCountry?.name.common}</TableCell>
            <TableCell align="right" ><Avatar alt={smallestCountry?.name.official} src={smallestCountry?.flags.png} /></TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"><Typography variant='h6'>Biggest area:</Typography></TableCell>
            <TableCell align="right">{biggestCountry?.name.common}</TableCell>
            <TableCell align="right" ><Avatar alt={biggestCountry?.name.official} src={biggestCountry?.flags.png} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}));

export default Summary;