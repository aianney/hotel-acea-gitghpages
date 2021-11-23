import React, { useContext } from 'react'
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Card,
  Popover,
  Button,
} from '@mui/material'
import AppContext from '../../app-context/app-context.component'
import Theme from '../../theme/theme.component'
import { BsDashCircleFill } from 'react-icons/bs'
import moment from 'moment'
import PaymentButton from '../../payment-method/payment-button/payment-button.component'
import PaymentOptions from '../../payment-method/payment-options/payment-options.component'

const PaymentPrice = () => {
  const { info, setInfo } = useContext(AppContext),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays(),
    removeRoomType = (roomType) => {
      const roomRemoved = info.roomSelection.rooms.length
          ? info.roomSelection.rooms
              .map((room) => (!room.id.includes(roomType) ? room : null))
              .filter((room) => room)
          : [],
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: roomRemoved,
            totalPayment: roomRemoved.length
              ? roomRemoved
                  .map((room) =>
                    !room.id.includes(roomType)
                      ? room.price +
                        (room.addOns.length
                          ? room.addOns
                              .map((addOn) => addOn.price * addOn.count)
                              .reduce((a, b) => a + b)
                          : 0)
                      : 0,
                  )
                  .reduce((a, b) => a + b)
              : 0,
          },
        }

      setInfo(updates)
      console.log(roomRemoved)
    }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Box px={4}>
        {info.reservationInformation && info.reservationInformation.room ? (
          info.reservationInformation.room.map((room) =>
            info.roomSelection.rooms.filter((e) => e.id.includes(room.roomType))
              .length ? (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{ ...alignCenter, justifyContent: 'space-between' }}
                >
                  <Typography
                    variant="priceBreakdownTitle"
                    sx={{
                      fontWeight: Theme.typography.bold,
                      fontSize: Theme.typography.fontSizeLg,
                    }}
                  >
                    {room.roomAttributes.roomName}
                  </Typography>
                  <IconButton
                    color="error"
                    sx={{
                      width: 'auto',
                      fontSize: Theme.typography.fontSizeLg,
                    }}
                    onClick={() => removeRoomType(room.roomType)}
                  >
                    <BsDashCircleFill />
                  </IconButton>
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Grid container>
                    {info.roomSelection.rooms
                      .filter((x) => x.id.includes(room.roomType))
                      .map((x, i) => (
                        <>
                          <Grid
                            item
                            xs={12}
                            sx={{
                              display:
                                info.roomSelection.rooms.filter((x) =>
                                  x.id.includes(room.roomType),
                                ).length === 1
                                  ? 'none'
                                  : '',
                            }}
                          >
                            <Box
                              px={1}
                              sx={{
                                ...alignCenter,
                                justifyContent: 'space-between',
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="priceBreakdownTitle"
                                  sx={{ fontSize: Theme.typography.fontSize }}
                                >
                                  {`Room ${i + 1}`}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          {/*Room Rate START */}
                          <Grid item xs={12}>
                            <Box
                              pl={1}
                              sx={{
                                ...alignCenter,
                                justifyContent: 'space-between',
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="priceBreakdownTitle"
                                  sx={{
                                    fontStyle: {
                                      md: 'italic',
                                    },
                                    fontWeight: { md: 500 },
                                    fontSize: { md: 20, xs: 16 },
                                  }}
                                >
                                  {x.rate}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="priceBreakdownTitle"
                                  sx={{
                                    fontStyle: {
                                      md: 'italic',
                                    },
                                    fontWeight: { md: 500 },
                                    fontSize: { md: 20, xs: 16 },
                                  }}
                                >
                                  {`${info.filters.currency}
                                                            ${(
                                                              x.price *
                                                              info.filters
                                                                .currencyRate
                                                            ).toLocaleString(
                                                              undefined,
                                                              {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                              },
                                                            )}`}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          {/*Room Rate END */}

                          {/* Show AddOns Label START */}

                          {x.addOns.length &&
                          x.addOns
                            .map((addOn) => addOn.count)
                            .reduce((a, b) => a + b) ? (
                            <Grid item xs={12} sx={{ ...alignCenter }}>
                              <Box pl={1} sx={{ width: '50%' }}>
                                <Typography
                                  variant="priceBreakdownTitle"
                                  sx={{
                                    fontStyle: 'italic',
                                    fontWeight: 500,
                                    wordWrap: 'break-word',
                                  }}
                                >
                                  <Button
                                    aria-describedby={id}
                                    variant="contained"
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Add Ons:
                                  </Button>
                                </Typography>
                              </Box>
                            </Grid>
                          ) : (
                            <></>
                          )}
                          {/* Show AddOns Label END */}
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                          >
                            <Typography sx={{ p: 2 }}>
                              {x.addOns.length ? (
                                x.addOns.map((addOn, index) =>
                                  addOn.count ? (
                                    <Grid item xs={12}>
                                      <Box
                                        pl={1}
                                        sx={{
                                          ...alignCenter,
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            variant="priceBreakdownTitle"
                                            sx={{
                                              wordWrap: 'break-word',
                                              fontStyle: {
                                                md: 'italic',
                                              },
                                              fontWeight: { md: 500 },
                                              fontSize: { md: 20, xs: 14 },
                                            }}
                                          >
                                            {`${
                                              addOn.count
                                                ? `(${addOn.count})`
                                                : ''
                                            } ${addOn.description}`}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="priceBreakdownTitle"
                                            sx={{
                                              fontStyle: {
                                                md: 'italic',
                                              },
                                              fontWeight: { md: 500 },
                                              fontSize: { md: 20, xs: 16 },
                                            }}
                                          >
                                            {`${info.filters.currency} 
                                                                            ${(
                                                                              addOn.price *
                                                                              addOn.count *
                                                                              info
                                                                                .filters
                                                                                .currencyRate *
                                                                              dateDifference
                                                                            ).toLocaleString(
                                                                              undefined,
                                                                              {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2,
                                                                              },
                                                                            )}`}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Grid>
                                  ) : (
                                    <></>
                                  ),
                                )
                              ) : (
                                <> </>
                              )}
                            </Typography>
                          </Popover>
                          {/* AddOns START */}

                          {/* AddOns END */}

                          {/* Subtotal per Room START */}
                          <Grid
                            item
                            xs={12}
                            mt={1}
                            mb={2}
                            sx={{
                              ...alignCenter,
                              justifyContent: 'flex-end',
                              display:
                                info.roomSelection.rooms.filter((x) =>
                                  x.id.includes(room.roomType),
                                ).length > 1 &&
                                x.addOns
                                  .map((addOn) => addOn.count)
                                  .reduce((a, b) => a + b) > 0
                                  ? 'flex'
                                  : 'none',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{
                                  wordWrap: 'break-word',
                                  fontStyle: {
                                    md: 'italic',
                                  },
                                  fontWeight: { md: 500 },
                                  fontSize: { md: 20, xs: 16 },
                                }}
                              >
                                {`Subtotal for 
                                                        Room
                                                        ${i + 1}: 
                                                        ${
                                                          info.filters.currency
                                                        } 
                                                        ${(
                                                          (x.price +
                                                            x.addOns
                                                              .map(
                                                                (addOn) =>
                                                                  addOn.count *
                                                                  addOn.price *
                                                                  dateDifference,
                                                              )
                                                              .reduce(
                                                                (a, b) => a + b,
                                                              )) *
                                                          info.filters
                                                            .currencyRate
                                                        ).toLocaleString(
                                                          undefined,
                                                          {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                          },
                                                        )}`}
                              </Typography>
                            </Box>
                          </Grid>
                          {/* Subtotal per Room END */}
                        </>
                      ))}
                  </Grid>
                  {/* Subtotal per Room START */}
                  <Grid item xs={12} my={2}>
                    <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                      <Typography
                        variant="priceBreakdownTitle"
                        sx={{
                          textAlign: 'center',
                          fontStyle: {
                            md: 'italic',
                          },
                          fontWeight: { md: 500 },
                          fontSize: { md: 20, xs: 16 },
                        }}
                      >
                        {`Subtotal for ${room.roomAttributes.roomName}: `}
                      </Typography>
                    </Box>
                    <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                      <Typography
                        variant="priceBreakdownTotal"
                        sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                      >
                        {`
                                        
                                        ${info.filters.currency} ${(
                          info.roomSelection.rooms
                            .filter((e) => e.id.includes(room.roomType))
                            .map(
                              (e) =>
                                e.price +
                                (e.addOns
                                  ? e.addOns
                                      .map(
                                        (addOn) =>
                                          addOn.count *
                                          addOn.price *
                                          dateDifference,
                                      )
                                      .reduce((a, b) => a + b)
                                  : 0),
                            )
                            .reduce((a, b) => a + b, 0) *
                          info.filters.currencyRate
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                      </Typography>
                    </Box>
                  </Grid>
                  <Divider />
                  {/* Subtotal per Room END */}
                </Grid>
              </Grid>
            ) : (
              <> </>
            ),
          )
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: Theme.palette.background.default,
              borderRadius: Theme.shape.borderRadius,
            }}
          >
            <Box px={1} py={2}>
              <Box
                my={1}
                sx={{ ...alignCenter, justifyContent: 'space-between' }}
              >
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{
                    fontWeight: Theme.typography.fontWeightBlack,
                    fontSize: { md: 20, xs: 16 },
                    textTransform: 'uppercase',
                  }}
                >
                  {`Rooms: `}
                </Typography>
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{ fontSize: { md: 20, xs: 16 } }}
                >
                  {info.filters.currency && info.filters.currencyRate
                    ? `${info.filters.currency} ${(
                        (info.roomSelection.rooms.length
                          ? info.roomSelection.rooms
                              .map((room) => room.price)
                              .reduce((a, b) => a + b)
                          : 0) * info.filters.currencyRate
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
                    fontSize: { md: 20, xs: 16 },
                    textTransform: 'uppercase',
                  }}
                >
                  {`Add Ons: `}
                </Typography>
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{ fontSize: { md: 20, xs: 16 } }}
                >
                  {info.filters.currency && info.filters.currencyRate
                    ? `${info.filters.currency} ${(
                        (info.roomSelection.rooms.length
                          ? info.roomSelection.rooms
                              .map((room) =>
                                room.addOns.length
                                  ? room.addOns
                                      .map((addOn) => addOn.count * addOn.price)
                                      .reduce((a, b) => a + b)
                                  : 0,
                              )
                              .reduce((a, b) => a + b)
                          : 0) * info.filters.currencyRate
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : 0}
                </Typography>
              </Box>
              <Box sx={{ ...alignCenter, justifyContent: 'space-between' }}>
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{
                    fontWeight: Theme.typography.fontWeightBlack,
                    fontSize: { md: 20, xs: 16 },
                    textTransform: 'uppercase',
                  }}
                >
                  {`Total: `}
                </Typography>
                <Typography variant="priceBreakdownTotal" sx={{ fontSize: 24 }}>
                  {info.filters.currency && info.filters.currencyRate
                    ? `${info.filters.currency} ${(
                        info.roomSelection.totalPayment *
                        info.filters.currencyRate
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : 0}
                </Typography>
              </Box>
            </Box>
          </Card>
          <Box mt={-1} mb={15}>
            <PaymentOptions />
          </Box>
          <PaymentButton />
        </Grid>
      </Box>
    </>
  )
}

export default PaymentPrice
