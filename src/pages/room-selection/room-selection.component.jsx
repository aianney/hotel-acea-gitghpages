import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import {
  AppContext,
  CustomButton,
  Filter,
  PageStepper,
  PriceBreakdown,
  Room,
} from '../../components'
import { BsSliders } from 'react-icons/bs'

const RoomSelection = () => {
  const { info, info: { filters, reservationInformation, roomSelection }, setInfo } = useContext(AppContext),
    iconSize = 22,
    [filterOpen, setFilterOpen] = useState(!filters.reservationDates.start && !filters.reservationDates.end),
    [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false),
    [dateChange, setDateChange] = useState(false),
    [proceed, setProceed] = useState(false),

    updateTotalPayment = () => {
      setInfo({
        ...info,
        roomSelection: {
          ...roomSelection,
          rooms: roomSelection.rooms,
          totalPayment:
            roomSelection.rooms && roomSelection.rooms.length
              ? roomSelection.rooms
                .map(
                  (room) =>
                    room.price +
                    (room.addOns.length
                      ? room.addOns
                        .map((addOn) => addOn.count * addOn.price)
                        .reduce((a, b) => a + b)
                      : 0),
                )
                .reduce((a, b) => a + b)
              : 0,
        },
      })
    }

  useEffect(() => {
    // backToIntro()
    document.title =
      'Acea Beach Resort - Select the rooms that you want to book'
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // eslint-disable-next-line
  }, [dateChange])

  return (
    <>
      <Box my={4}>
        <PageStepper activeStep={0} />
      </Box>
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
              <Typography variant="pageTitle">Select Rooms</Typography>
              <IconButton
                onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
                p={0}
              >
                <BsSliders size={iconSize} />
              </IconButton>
            </Box>
            <Box mb={3}>
              <Typography variant="pageSubtitle">
                Select how many rooms you will use while staying.
                <Typography
                  variant="pageSubtitle"
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    fontStyle: 'italic',
                    fontSize: 14,
                  }}
                >
                  {` (Swipe left or right on the cards if you have selected more than one of the following rooms)`}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {reservationInformation ? (
        reservationInformation.room.map((roomInformation, index) => (
          <>
            <Room
              information={roomInformation}
              index={index}
              updateTotalPayment={updateTotalPayment}
            />
          </>
        ))
      ) : (
        <></>
      )}

      {/* Filter START */}
      <Filter
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        setDateChange={setDateChange}
        text="Apply Filter"
      />
      {/* Filter END */}

      {/* Price Breakdown START */}
      <PriceBreakdown
        priceBreakdownOpen={priceBreakdownOpen}
        setPriceBreakdownOpen={setPriceBreakdownOpen}
        proceed={proceed}
        setProceed={setProceed}
      />
      {/* Price Breakdown END */}

      {/* Action Button START */}
      <CustomButton
        onClick={() => {
          setProceed(true)
          setPriceBreakdownOpen(true)
        }}
        disabled={roomSelection.rooms && !roomSelection.rooms.length}
      >
        Proceed
      </CustomButton>
      {/* Action Button END */}

      <Box p={2} sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 201 }}>
        <Button
          onClick={() => {
            setPriceBreakdownOpen((priceBreakdownOpen) => !priceBreakdownOpen)
          }}
          disabled={
            roomSelection.rooms && !roomSelection.rooms.length
          }
        >
          <Box
            px={2}
            py={1}
            sx={{
              textDecoration: 'none',
              color: 'unset',
            }}
          >
            Cost Summary
          </Box>
        </Button>
      </Box>
    </>
  )
}

export default RoomSelection
