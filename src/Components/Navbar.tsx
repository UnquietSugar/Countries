import React, { FC, useState } from 'react';
import CountryStore from '../Stores/CountryStore';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import sortOptions from '../Enums/sortEnum'
import { Link } from 'react-router-dom';

interface INavbarProps {
  countryStore?: CountryStore
  sortIsDisabled: boolean;
}

const Navbar: FC<INavbarProps> = inject('countryStore')(observer(({ countryStore, sortIsDisabled }) => {
  const classes = useStyles();

  const [sortBy, setsortBy] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setsortBy(value as string);

    switch (Number(value)) {
      case sortOptions.name:
        countryStore?.sortByName();
        break;
      case sortOptions.population:
        countryStore?.sortByPopulation();
        break;
      case sortOptions.area:
        countryStore?.sortByArea();
        break;
      default:
        countryStore?.assignOriginalCountriesArray();
    };
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
          <FormControl fullWidth variant='filled' sx={{ bgcolor: 'white' }} disabled={sortIsDisabled}>
            <InputLabel>Sort by...</InputLabel>
            <Select value={sortBy} label="Sort" onChange={handleChange} >
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
};

export default Navbar;