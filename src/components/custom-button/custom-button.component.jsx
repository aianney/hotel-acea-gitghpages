import React from 'react'
import Theme from '../theme/theme.component'
import { Box, Button } from '@material-ui/core'

const CustomButton = ({ children, ...props }) => {
  return (
    <>
      <Box p={2}
        sx={{
          backgroundColor: Theme.palette.background.light,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "flex-end",
          position: "fixed",
          width: "100vw",
          boxSizing: "border-box",
          zIndex: 200,
        }}
      >
        <Box>
          <Button
            {...props}
            variant="navigationButton"
            sx={{
              borderRadius: Theme.shape.borderRadius,
            }}
          >
            <Box px={2} py={1}>
            {children}
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CustomButton
