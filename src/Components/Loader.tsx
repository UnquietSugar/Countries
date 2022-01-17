import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from '../styles/styles';

export default function CircularIndeterminate() {
  return (
    <Box sx={styles.loaderBoxSx}>
      <CircularProgress />
    </Box>
  );
};