import React, { useContext } from 'react'
import {
  Box,
  Grid,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@material-ui/core'
import AppContext from '../../app-context/app-context.component'
import Theme from '../../theme/theme.component'
import moment from 'moment'
import './payment-content.styles.css'

const Payment = (props) => {
  const { info, setInfo } = useContext(AppContext)
  console.log(info)

  React.useEffect(() => {
    setInfo({
      ...info,
      reservationDates: {
        ...info.filters.reservationDates.start,
        ...info.filters.reservationDates.end,
      },
    })
    // eslint-disable-next-line
  }, [info.filters.reservationDates.start, info.filters.reservationDates.end])

  return (
    <>
      {/* <Box mb={1}> */}
      <Box px={4}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'block',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="pageTitle">Booking Details</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box ml={-3}>
          <List sx={{ width: { md: '100%', xs: '100%' } }}>
            <ListItemButton>
              <ListItemText>
                <Typography
                  variant="pageTitle"
                  sx={{
                    fontWeight: Theme.typography.fontWeightBlack,
                    fontSize: Theme.typography.fontSize,
                    // textTransform: 'uppercase',
                  }}
                >
                  Name:{' '}
                  <Typography variant="priceBreakdownTitlePrice">
                    {' '}
                    {`${info.guestDetails.firstName}
               ${info.guestDetails.lastName}`}
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
          <Box mt={-4}>
            <List sx={{ width: '100%' }}>
              <ListItemButton>
                <ListItemText>
                  <Typography
                    variant="pageTitle"
                    sx={{
                      fontWeight: Theme.typography.fontWeightBlack,
                      fontSize: Theme.typography.fontSize,
                      // textTransform: 'uppercase',
                    }}
                  >
                    Email:
                  </Typography>
                  <Typography variant="priceBreakdownTitlePrice">
                    {' '}
                    {info.guestDetails.email}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
          <Box mt={-4}>
            <List sx={{ width: '100%' }}>
              <ListItemButton>
                <ListItemText>
                  <Typography
                    variant="pageTitle"
                    sx={{
                      fontWeight: Theme.typography.fontWeightBlack,
                      fontSize: Theme.typography.fontSize,
                      // textTransform: 'uppercase',
                    }}
                  >
                    Contact:
                    <Typography variant="priceBreakdownTitlePrice">
                      {info.guestDetails.phoneNumber}
                    </Typography>
                  </Typography>
                </ListItemText>
                {/* <Box mr={14}>
                  <ListItemText>
                    <Typography variant="priceBreakdownTitlePrice">
                      {info.guestDetails.phoneNumber}
                    </Typography>
                  </ListItemText>
                </Box> */}
              </ListItemButton>
            </List>
          </Box>
          <Box mt={-4}>
            <List sx={{ width: '100%' }}>
              <ListItemButton>
                <ListItemText>
                  <Typography
                    variant="pageTitle"
                    sx={{
                      fontWeight: Theme.typography.fontWeightBlack,
                      fontSize: Theme.typography.fontSize,
                      // textTransform: 'uppercase',
                    }}
                  >
                    Stay Period: {'  '}
                    <Typography variant="priceBreakdownTitlePrice">
                      {moment(info.filters.reservationDates.start).format('ll')}{' '}
                      {''}
                    </Typography>
                    <Typography variant="priceBreakdownTitlePrice">
                      To{' '}
                      {moment(info.filters.reservationDates.end).format('ll')}
                    </Typography>
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Box>

        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Name :{' '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="priceBreakdownTitlePrice ">
              {`${info.guestDetails.firstName}
               ${info.guestDetails.lastName}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Email :{' '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.email}
            </Typography>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Contact :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.phoneNumber}
            </Typography>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Stay Period :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* <Box
              py={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            > */}
        {/* <Typography variant="priceBreakdownTitlePrice">
              {moment(info.filters.reservationDates.start).format(
                'MMMM DD, YYYY',
              )}{' '}
              {''}
            </Typography>
            {/* </Box> */}
        {/* <Typography variant="priceBreakdownTitlePrice">
              To{' '}
              {moment(info.filters.reservationDates.end).format(
                'MMMM DD, YYYY',
              )}
            </Typography>
          </Grid>
        </Grid>   */}

        {/* <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Name :{' '}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {`${info.guestDetails.firstName} ${info.guestDetails.lastName}`}
            </Typography>
          </Grid> */}

        {/* <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Email :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.email}
            </Typography>
          </Grid> */}
        {/* <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Contact :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.number}
            </Typography>
          </Grid> */}
        {/* <Divider />
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Stay Period :
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">{`${info.filters.reservationDates.start} ${info.filters.reservationDates.end}`}</Typography>
          </Grid> */}
      </Box>
    </>
  )
}

export default Payment
