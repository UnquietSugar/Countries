import React, { FC, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { CountryStore } from '../Stores/CountryStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, TablePagination } from '@mui/material';
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import styles from '../styles/styles';

interface IDataTableProps {
  countryStore?: CountryStore;
}

const DataTable: FC<IDataTableProps> = inject('countryStore')(observer(({ countryStore }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={4} sx={styles.tableContainerSx} >
        <Table sx={styles.tableSx} aria-label="simple table">
          <TableHead >
            <TableRow color='secondary' >
              <TableCell ><Typography variant='h6'>Name</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>Region</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>Area</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>Population</Typography></TableCell>
              <TableCell align="right"><Typography variant='h3'><FlagCircleRoundedIcon /></Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryStore?.currentCountries.slice(page * rowsPerPage, (page * rowsPerPage + rowsPerPage)).map((country: any, i: number) => (
              <TableRow key={country.name + i}  >
                <TableCell component="th" scope="row">{country.name.common}</TableCell>
                <TableCell align="right">{country.region}</TableCell>
                <TableCell align="right">{countryStore.toSqMiles(country.area)}</TableCell>
                <TableCell align="right">{countryStore.toMillionsOrThousands(country.population)}</TableCell>
                <TableCell align="right" ><Avatar alt={country.name.official} src={country.flags.png} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      <div style={styles.paginationDiv}>
        <TablePagination
          count={countryStore?.currentCountries.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 50, 100, 250]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}));



export default DataTable;