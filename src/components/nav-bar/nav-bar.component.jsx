import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext, Theme } from '..'
import { AiOutlineHome, AiOutlineMobile } from 'react-icons/ai'
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import LogoWide from '../../assets/media/images/logo-wide.svg'
import Logo from '../../assets/media/images/logo.svg'

const NavBar = () => {
  const { info } = useContext(AppContext),
    iconSize = 22

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: Theme.palette.light.light,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <img src={LogoWide} height="40" alt="" />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'none',
                  },
                }}
              >
                <img src={Logo} height="40" alt="" />
              </Box>
            </Box>
            <Box>
              <NavLink
                to={
                  !Object.keys(info.payment).length === 0
                    ? '/payments'
                    : !Object.keys(info.guestDetails).length === 0
                    ? '/guest-details'
                    : info.filters.reservationDates.start &&
                      info.filters.reservationDates.end
                    ? '/room-selection'
                    : '/'
                }
              >
                <Button
                  sx={{
                    color: 'black',
                  }}
                >
                  <AiOutlineHome size={iconSize} />
                  <Typography
                    variant="navBarLink"
                    sx={{
                      ml: 2,
                      display: {
                        xs: 'none',
                        sm: 'block',
                      },
                      textDecoration: 'none',
                    }}
                  >
                    Home
                  </Typography>
                </Button>
              </NavLink>
              <NavLink to="/contact-us">
                <Button
                  sx={{
                    color: 'black',
                  }}
                >
                  <AiOutlineMobile size={iconSize} />
                  <Typography
                    variant="navBarLink"
                    sx={{
                      ml: 2,
                      display: {
                        xs: 'none',
                        sm: 'block',
                      },
                      textDecoration: 'none',
                    }}
                  >
                    Contact Us
                  </Typography>
                </Button>
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar
