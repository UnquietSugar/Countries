import React, { FC, useState } from 'react';
import CountryStore from '../Stores/CountryStore';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import sortOptions from '../Enums/sortEnum'
import { Link } from 'react-router-dom';

interface INavbarProps {
  countryStore?: CountryStore
}

const Navbar: FC<INavbarProps> = inject('countryStore')(observer(({ countryStore }) => {
  const classes = useStyles();
  const [sortBy, setsortBy] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setsortBy(value as string);
    if (Number(value) === sortOptions.unsorted) countryStore?.assignOriginalCountriesArray();
    if (Number(value) === sortOptions.name) countryStore?.sortByName();
    if (Number(value) === sortOptions.population) countryStore?.sortByPopulation();
    if (Number(value) === sortOptions.area) countryStore?.sortByArea();
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
            <InputLabel id="demo-simple-select-label">Sort by...</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value={sortOptions.unsorted}>Unsorted</MenuItem>
              <MenuItem value={sortOptions.name}>Name</MenuItem>
              <MenuItem value={sortOptions.population}>Population</MenuItem>
              <MenuItem value={sortOptions.area}>Area</MenuItem>
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