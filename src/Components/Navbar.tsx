import React, { FC, useState } from 'react';
import CountryStore from '../Stores/CountryStore';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import filterOptions from '../Enums/filterEnum'
import { Link } from 'react-router-dom';

interface INavbarProps {
  countryStore?: CountryStore
}

const Navbar: FC<INavbarProps> = inject('countryStore')(observer(({ countryStore }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilter(value as string);
    if (Number(value) === filterOptions.unsorted) countryStore?.assignOriginalCountriesArray();
    if (Number(value) === filterOptions.name) countryStore?.sortByName();
    if (Number(value) === filterOptions.population) countryStore?.sortByPopulation();
    if (Number(value) === filterOptions.area) countryStore?.sortByArea();
  };
  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Countries
        </Typography>
        <Link to='/' style={linkStyle} ><Button sx={{ color: 'white' }} aria-selected={true}>Countries Table</Button></Link>
        <Link to='/lang-table' style={linkStyle} ><Button sx={{ color: 'white' }} aria-selected={true}>Languages Table</Button></Link>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth variant='filled' sx={{ bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Filter by...</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={filterOptions.unsorted}>Unsorted</MenuItem>
              <MenuItem value={filterOptions.name}>Name</MenuItem>
              <MenuItem value={filterOptions.population}>Population</MenuItem>
              <MenuItem value={filterOptions.area}>Area</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}));

const useStyles = makeStyles(() => ({
  navBar: {
    marginTop: 10,
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));

const linkStyle = {
  textDecoration: "none",
  marginRight: 50
}




export default Navbar;