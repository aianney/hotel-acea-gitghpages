import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  Select,
  Slide,
  Collapse,
} from '@material-ui/core'
import { AppContext, Theme } from '..'
import axios from 'axios'
import {
  BsDash,
  BsCalendar4Event,
  BsCalendar4Range,
  BsPerson,
  BsPeople,
  BsPlus,
} from 'react-icons/bs'
import moment from 'moment'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const Filter = (props) => {
  const isInitialMount = useRef(true),
    { info, info: { filters }, setInfo } = useContext(AppContext),
    [filterClosable, setFilterClosable] = useState(filters.reservationDates.start && filters.reservationDates.end),
    errorStyle = (activator) => {
      return {
        height: activator ? '' : '0px',
        padding: activator ? '' : '0px !important',
        margin: '0px',
        overflow: 'hidden',
        transition: 'all .5s ease',
      }
    },
    iconSize = "1rem",
    defaults = {
      children: {
        max: 10,
        min: 0,
      },
      adults: {
        max: 20,
        min: 1,
      },
      room: {
        adults: 1,
        children: 0,
        addOns: {
          adults: 0,
          children: 0,
        },
        rates: 0,
      },
    },
    [adults, setAdults] = useState(
      filters.guests.adults ? filters.guests.adults : 1,
    ),
    [children, setChildren] = useState(
      filters.guests.children ? filters.guests.children : 0,
    ),
    [startDate, setStartDate] = useState(
      filters.reservationDates.start
        ? filters.reservationDates.start
        : new Date(),
    ),
    [startDatePickerOpen, setStartDatePickerOpen] = useState(false),
    [endDate, setEndDate] = useState(
      filters.reservationDates.end
        ? filters.reservationDates.end
        : new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
    ),
    [endDatePickerOpen, setEndDatePickerOpen] = useState(false),
    // eslint-disable-next-line
    [displayCurrency, setDisplayCurrency] = useState(false),
    [currencies, setCurrencies] = useState([]),
    [currency, setCurrency] = useState('PHP'),
    [currencyRate, setCurrencyRate] = useState(1),
    [noRoom, setNoRoom] = useState(false),
    [bookingError, setBookingError] = useState(''),
    checkDate = () => {
      // eslint-disable-next-line
      const start = moment(startDate).format('YYYY-MM-DD'),
        // eslint-disable-next-line
        end = moment(endDate).format('YYYY-MM-DD'),
        url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=${start}&dateCheckOut=${end}`
      // url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=2022-01-28&dateCheckOut=2022-01-29`;

      axios
        .get(url)
        .then((r) => {
          r.data.state === 'Error'
            ? errorDate(r.data.remarks)
            : r.data.data[0].room.length === 0
              ? noRoomAvailable()
              : // console.log(r.data.data[0]);
              reserveDate(r.data.data[0])
        })
        .catch((e) => console.log(e))
    },
    applyCurrencies = () => {
      axios({
        method: 'get',
        url: 'https://currency-exchange.p.rapidapi.com/listquotes',
        headers: {
          'x-rapidapi-key':
            'a5e9a0b4fbmshe3c522987820eb7p1b3ed8jsn83f8c8be32d8',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      })
        .then((r) => {
          r.data.push('PHP')
          r.data.splice(r.data.indexOf('CNH'), 1)

          setCurrencies(r.data.sort())
        })
        .catch((e) => {
          console.log(e)
          setDisplayCurrency(false)
        })
    },
    getCurrencyRates = () => {
      axios({
        method: 'get',
        url: `https://currency-exchange.p.rapidapi.com/exchange?from=PHP&to=${currency}&q=1.0`,
        headers: {
          'x-rapidapi-key':
            'a5e9a0b4fbmshe3c522987820eb7p1b3ed8jsn83f8c8be32d8',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      })
        .then((r) => {
          setCurrencyRate(r.data)
        })
        .catch((e) => {
          console.log(e)
          setDisplayCurrency(false)
        })
    },
    cancelPanel = () => {
      props.setFilterOpen(false)
      setCurrency(filters.currency)
    },
    applyFilter = (data) => {
      let updates = {
        ...info,
        filters: {
          ...filters,
          currency: currency,
          currencyRate: currencyRate,
          guests: {
            adults: adults,
            children: children,
          },
        },
        reservationInformation: data,
      }

      setInfo(updates)

      if (
        filters.reservationDates.start !== startDate ||
        filters.reservationDates.end !== endDate
      ) {
        updates = {
          ...info,
          filters: {
            ...filters,
            currency: currency,
            currencyRate: currencyRate,
            reservationDates: {
              start: startDate,
              end: endDate,
            },
          },
          roomSelection: {
            rooms: [],
            totalPayment: 0,
          },
          reservationInformation: data,
        }
        setInfo(updates)
      }
      setFilterClosable(true);

      setNoRoom(false)
      setBookingError('')

      props.setFilterOpen(false)
    },
    reserveDate = (data) => applyFilter(data),
    noRoomAvailable = () => {
      setNoRoom(true)
      setBookingError('')
      setTimeout(() => {
        setNoRoom(false)
      }, 5000)
    },
    errorDate = (remarks) => {
      setNoRoom(false)
      setBookingError(remarks)
      setTimeout(() => {
        setBookingError('')
      }, 5000)
    }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setEndDatePickerOpen(true)
    }
  }, [startDate])

  useEffect(() => {
    applyCurrencies()
  }, [])

  useEffect(() => {
    getCurrencyRates()
    // eslint-disable-next-line
  }, [currency])

  useEffect(() => {
    setInfo({
      ...info,
      filters: {
        ...filters,
        guests: {
          adults: adults,
          children: children,
        },
      },
    })
    // eslint-disable-next-line
  }, [adults, children])

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
        <Fade in={props.filterOpen}>
          <Box
            onClick={() => filterClosable ? props.setFilterOpen(false) : console.log("initial Mount")}
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
        <Slide direction="up" in={props.filterOpen}>
          <Card
            sx={{
              backgroundColor: Theme.palette.background.light,
              overflowY: {
                xs: 'scroll',
                md: 'hidden',
              },
              maxHeight: {
                xs: '100vh',
              },
              width: {
                xs: '100%',
                sm: '50vw',
                md: '80vw',
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
                md: 20,
              },
              right: {
                xs: 0,
                sm: 30,
                md: 0,
              },
              left: {
                xs: 0,
                sm: 'auto',
                md: 0,
              },
              margin: {
                md: 'auto',
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadius,
              },
              borderBottomLeftRadius: {
                xs: 0,
                sm: Theme.shape.borderRadius,
              },
              borderBottomRightRadius: {
                xs: 0,
                sm: Theme.shape.borderRadius,
              },
            }}
          >
            <Box p={2}>
              <Grid container spacing={3}>
                {/* Reservation Dates START */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.light.main,
                      width: '100%',
                    }}
                  >
                    <Box mt={2} ml={2}>
                      <Typography variant="filterLabel">
                        Reservation Dates
                      </Typography>
                    </Box>
                    <Box px={2}>
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          showToolbar={false}
                          sx={{
                            fontFamily: Theme.typography.fontFamily.sansSerif,
                          }}
                          minDate={new Date()}
                          onChange={() => { }}
                          onAccept={setStartDate}
                          onClose={() => setStartDatePickerOpen(false)}
                          open={startDatePickerOpen}
                          okText={'Confirm Check-In Date'}
                          renderInput={({
                            disabled,
                            inputProps,
                            onChange,
                            ref,
                            value,
                            ...other
                          }) => (
                            <div ref={ref} {...other}>
                              <input
                                disabled={disabled}
                                onChange={onChange}
                                style={{ display: 'none' }}
                                value={value}
                                {...inputProps}
                              />
                              <Button
                                onClick={() =>
                                  setStartDatePickerOpen(
                                    (startDatePickerOpen) =>
                                      !startDatePickerOpen,
                                  )
                                }
                                sx={Theme.typography.filterText}
                              >
                                <Box
                                  py={2}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                  }}
                                >
                                  <BsCalendar4Event size={iconSize} />
                                  {moment(startDate).format(
                                    '(dddd) MMMM DD, YYYY',
                                  )}
                                </Box>
                              </Button>
                            </div>
                          )}
                          value={startDate ? startDate : new Date()}
                        />
                      </LocalizationProvider>
                      <Divider />
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          showToolbar={false}
                          sx={{
                            fontFamily: Theme.typography.fontFamily.sansSerif,
                          }}
                          minDate={
                            new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                          }
                          onChange={() => { }}
                          onAccept={setEndDate}
                          onClose={() => {
                            if (startDate > endDate) {
                              setEndDate(
                                new Date(
                                  startDate.getTime() + 24 * 60 * 60 * 1000,
                                ),
                              )
                            }
                            setEndDatePickerOpen(false)
                          }}
                          open={endDatePickerOpen}
                          okText={'Confirm Check-Out Date'}
                          renderInput={({
                            ref,
                            inputProps,
                            disabled,
                            onChange,
                            value,
                            ...other
                          }) => (
                            <div ref={ref} {...other}>
                              <input
                                disabled={disabled}
                                onChange={onChange}
                                style={{ display: 'none' }}
                                value={value}
                                {...inputProps}
                              />
                              <Button
                                sx={Theme.typography.filterText}
                                onClick={() =>
                                  setEndDatePickerOpen(
                                    (endDatePickerOpen) => !endDatePickerOpen,
                                  )
                                }
                              >
                                <Box
                                  py={2}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                  }}
                                >
                                  <BsCalendar4Range size={iconSize} />
                                  {moment(endDate).format(
                                    '(dddd) MMMM DD, YYYY',
                                  )}
                                </Box>
                              </Button>
                            </div>
                          )}
                          value={endDate}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Card>
                </Grid>
                {/* Reservation Dates END */}

                {/* Guests Per Room START */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.light.main,
                      width: '100%',
                    }}
                  >
                    <Box mt={2} ml={2}>
                      <Typography variant="filterLabel">
                        Guests per Room
                      </Typography>
                    </Box>
                    <Box px={2}>
                      {/* Adults Tab START */}
                      <Box
                        py={2}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                          ml={1}
                        >
                          <BsPeople size={33} />
                          <Typography
                            variant="filterText"
                            ml={3}
                          >
                            {adults} Adult{adults === 1 ? '' : 's'}
                          </Typography>
                        </Box>
                        <ButtonGroup variant="contained">
                          <Button
                            disabled={
                              adults === defaults.adults.min ? true : false
                            }
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            onClick={() =>
                              adults === defaults.adults.min
                                ? ''
                                : setAdults((adults) => adults - 1)
                            }
                          >
                            <BsDash size={iconSize} />
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              adults === defaults.adults.max ? true : false
                            }
                            onClick={() =>
                              adults === defaults.adults.max
                                ? ''
                                : setAdults((adults) => adults + 1)
                            }
                          >
                            <BsPlus size={iconSize} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                      {/* Adults Tab END */}

                      <Divider />

                      {/* Children Tab START */}
                      <Box
                        py={2}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                          ml={1}
                        >
                          <BsPerson size={33} />
                          <Typography
                            variant="filterText"
                            ml={3}
                          >
                            {children} Child{children === 1 ? '' : 'ren'}
                          </Typography>
                        </Box>
                        <ButtonGroup variant="contained">
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              children === defaults.children.min ? true : false
                            }
                            onClick={() =>
                              children === defaults.children.min
                                ? ''
                                : setChildren((children) => children - 1)
                            }
                          >
                            <BsDash size={iconSize} />
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              children === defaults.children.max ? true : false
                            }
                            onClick={() =>
                              children === children.max
                                ? ''
                                : setChildren((children) => children + 1)
                            }
                          >
                            <BsPlus size={iconSize} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                      {/* Children Tab END */}
                    </Box>
                  </Card>
                </Grid>
                {/* Guests Per Room END */}

                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: Theme.palette.light.main }}>
                    <Grid container>
                      {/* <Grid item xs={6}>
                                                <Box my={3} ml={3}>
                                                    <Typography variant="filterLabel">
                                                        Language
                                                    </Typography>
                                                    <GoogleTranslate />
                                                </Box>
                                            </Grid> */}
                      <Grid item xs={12}>
                        <Box my={2} mx={2}>
                          <Typography variant="filterLabel">
                            Currency
                          </Typography>
                          <FormControl
                            sx={{ mt: -3, minWidth: 120, width: '100%' }}
                          >
                            <Select
                              defaultValue={filters.currency}
                              value={
                                filters.currency &&
                                  filters.currency === currency
                                  ? filters.currency
                                  : currency
                              }
                              onChange={(e) => setCurrency(e.target.value)}
                              variant="filled"
                              displayEmpty
                              disableUnderline={true}
                              sx={{
                                ...Theme.cardSelect,
                                backgroundColor: 'rgba(0,0,0,0)',
                                "&focus": {
                                  backgroundColor: 'rgba(0,0,0,0)',
                                }
                              }}
                            >
                              {currencies
                                .sort((a, b) => b - a)
                                .map((cur) => (
                                  <MenuItem value={cur}>{cur}</MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} sx={errorStyle(bookingError)}>
                  <Collapse
                    in={bookingError}
                    timeout={{ enter: 500, exit: 500 }}
                  >
                    <Box>
                      <Alert severity="error">{bookingError}</Alert>
                    </Box>
                  </Collapse>
                </Grid>
                <Grid item xs={12} sx={errorStyle(noRoom)}>
                  <Collapse in={noRoom} timeout={{ enter: 500, exit: 500 }}>
                    <Box>
                      <Alert severity="error">
                        There are no rooms available on the dates you've chosen
                        — let's go check another date!
                      </Alert>
                    </Box>
                  </Collapse>
                </Grid>
              </Grid>
            </Box>

            {/* Buttons START */}
            <Box
              mb={2}
              mx={2}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                {/* Cancel Buttons START */}
                <Button
                  onClick={() => cancelPanel()}
                  sx={{
                    borderRadius: {
                      xs: Theme.shape.borderRadius,
                      sm: Theme.shape.borderRadius,
                    },
                    display: filterClosable ? "" : "none"
                  }}
                >
                  <Box
                    px={2}
                    py={1}
                    sx={{
                      textDecoration: 'none',
                      color: 'unset',
                    }}
                  >
                    Cancel
                  </Box>
                </Button>
                {/* Cancel Buttons END */}

                {/* Action Buttons START */}
                <Button
                  variant="navigationButton"
                  color="primary"
                  onClick={checkDate}
                >
                  <Box px={2} py={1}>
                    {filterClosable ? props.text : "Reserve Date"}
                  </Box>
                </Button>
                {/* Action Buttons END */}
              </Box>
            </Box>
            {/* Buttons END */}
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default Filter
