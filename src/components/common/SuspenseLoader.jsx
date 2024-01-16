import { CircularProgress, Typography,Box } from '@mui/material';

import React from 'react'

const SuspenseLoader = () => {
  return (
      <Box>
          <CircularProgress />
          <Typography>
              Loading...
          </Typography>
  </Box>
  )
}

export default SuspenseLoader;