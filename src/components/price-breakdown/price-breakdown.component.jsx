import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Collapse,
  Fade,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core'
import { Theme, AppContext } from '..'
import moment from 'moment'
import PriceBreakDownContent from '../price-breakdown-content/price-breakdown-content.component'

const PriceBreakdown = (props) => {
  const { info, info: { filters, roomSelection } } = useContext(AppContext),
    [showDetails, setShowDetails] = useState(false),
    history = useHistory(),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference = moment
      .duration(
        moment(filters.reservationDates.end).diff(
          moment(filters.reservationDates.start),
        ),
      )
      .asDays(),
    totalPrice = filters.currency && filters.currencyRate
      ? `${filters.currency} ${(
        roomSelection.totalPayment *
        filters.currencyRate
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
      : 0

  useEffect(() => {
    if (roomSelection.rooms && !roomSelection.rooms.length) {
      props.setPriceBreakdownOpen(false)
    }
    // eslint-disable-next-line
  }, [info])

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          zIndex: 1200,
        }}
      >
        {/* Backdrop START */}
        <Fade in={props.priceBreakdownOpen}>
          <Box
            onClick={() => {
              props.setPriceBreakdownOpen(false);
              props.setProceed(false);
              setShowDetails(false);
            }}
            sx={{
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,.75)',
              bottom: 0,
              height: '100vh',
              left: 0,
              width: '100vw',
              position: 'fixed',
            }}
          ></Box>
        </Fade>
        {/* Backdrop END */}

        {/* Filter Card START */}
        <Slide direction="up" in={props.priceBreakdownOpen}>
          <Card
            sx={{
              maxHeight: { xs: '100vh', sm: '70vh' },
              overflowY: showDetails ? 'scroll' : 'hidden',
              backgroundColor: Theme.palette.background.light,
              width: {
                xs: '100%',
                sm: '50vw',
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
              },
              left: {
                xs: 0,
                sm: props.proceed ? 'auto' : 30,
              },
              right: {
                xs: 0,
                sm: props.proceed ? 30 : 'auto',
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadiusLg,
              },
            }}
          >
            <Box p={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="filterLabel">
                    Cost Summary ({roomSelection.rooms.length} room{roomSelection.rooms.length === 1 ? "" : "s"} for {dateDifference} night
                    {dateDifference !== 1 ? 's' : ''})
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Collapse in={showDetails}>
                    <Card
                      sx={{
                        backgroundColor: Theme.palette.background.default,
                        borderRadius: Theme.shape.borderRadius,
                      }}
                    >
                      <Box p={3}>
                        <PriceBreakDownContent />
                      </Box>
                    </Card>
                  </Collapse>
                  <Button
                    variant="text"
                    fullWidth
                    onClick={() =>
                      setShowDetails((showDetails) => !showDetails)
                    }
                  >
                    <Box
                      px={2}
                      py={1}
                      sx={{
                        fontWeight: Theme.typography.fontWeightBold,
                        textDecoration: 'none',
                        color: 'unset',
                      }}
                    >
                      {showDetails ? 'hide' : 'show'} Detailed Summary
                    </Box>
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.background.default,
                      borderRadius: Theme.shape.borderRadius,
                    }}
                  >
                    <Box px={4} py={2}>
                      <Box
                        my={1}
                        sx={{ ...alignCenter, justifyContent: 'space-between' }}
                      >
                        <Typography
                          variant="priceBreakdownTitle"
                          sx={{
                            fontWeight: Theme.typography.fontWeightBlack,
                            fontSize: Theme.typography.fontSizeXs,
                            textTransform: 'uppercase',
                          }}
                        >
                          {`Rooms: `}
                        </Typography>
                        <Typography
                          variant="priceBreakdownTitle"
                          sx={{ fontSize: Theme.typography.fontSizeXs }}
                        >
                          {filters.currency && filters.currencyRate
                            ? `${filters.currency} ${(
                              (roomSelection.rooms.length
                                ? roomSelection.rooms
                                  .map((room) => room.price)
                                  .reduce((a, b) => a + b)
                                : 0) *
                              filters.currencyRate
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                            : 0}
                        </Typography>
                      </Box>
                      <Box
                        my={1}
                        sx={{ ...alignCenter, justifyContent: 'space-between' }}
                      >
                        <Typography
                          variant="priceBreakdownTitle"
                          sx={{
                            fontWeight: Theme.typography.fontWeightBlack,
                            fontSize: Theme.typography.fontSizeXs,
                            textTransform: 'uppercase',
                          }}
                        >
                          {`Add Ons: `}
                        </Typography>
                        <Typography
                          variant="priceBreakdownTitle"
                          sx={{ fontSize: Theme.typography.fontSizeXs }}
                        >
                          {filters.currency && filters.currencyRate
                            ? `${filters.currency} ${(
                              (roomSelection.rooms.length
                                ? roomSelection.rooms
                                  .map((room) =>
                                    room.addOns.length
                                      ? room.addOns
                                        .map(
                                          (addOn) =>
                                            addOn.count * addOn.price * dateDifference,
                                        )
                                        .reduce((a, b) => a + b)
                                      : 0,
                                  )
                                  .reduce((a, b) => a + b)
                                : 0) *
                              filters.currencyRate
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                            : 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ ...alignCenter, justifyContent: 'space-between' }}
                      >
                        <Typography
                          variant="priceBreakdownTitle"
                          sx={{
                            fontWeight: Theme.typography.fontWeightBlack,
                            fontSize: Theme.typography.fontSizeXs,
                            textTransform: 'uppercase',
                          }}
                        >
                          {`Total: `}
                        </Typography>
                        <Typography
                          variant="priceBreakdownTotal"
                          sx={{ fontSize: totalPrice.length > 14 ? Theme.typography.fontSize : Theme.typography.fontSizeLg }}
                        >
                          {totalPrice}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box mb={2} mx={2} sx={{ ...alignCenter, justifyContent: 'end' }}>
              <Button
                variant="text"
                onClick={() => {
                  props.setPriceBreakdownOpen(false);
                  setShowDetails(false);
                }}
              >
                <Box
                  px={2}
                  py={1}
                  sx={{
                    fontSize: Theme.typography.fontSize,
                    fontWeight: Theme.typography.fontWeightBold,
                    textDecoration: 'none',
                    color: 'unset',
                  }}
                >
                  Add More Rooms
                </Box>
              </Button>
              {/* Action Buttons START */}
              <Button
                variant="navigationButton"
                sx={{
                  display: props.proceed ? 'flex' : 'none',
                  justifyContent: 'flex-end',
                  borderRadius: Theme.shape.borderRadius,
                }}
                onClick={() => {
                  history.push('/guest-details')
                }}
                disabled={
                  roomSelection.rooms && roomSelection.rooms.length
                    ? false
                    : true
                }
              >
                <Box
                  px={2}
                  py={1}
                >
                  Proceed
                </Box>
              </Button>
              {/* Action Buttons END */}
            </Box>
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default PriceBreakdown
