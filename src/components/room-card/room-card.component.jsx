import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Grid,
  MenuItem,
  Typography,
  Zoom,
} from '@material-ui/core'
import { IoBedOutline } from 'react-icons/io5'
import { BsPeople, BsDash, BsPlus, BsTextareaResize } from 'react-icons/bs'
import { AppContext, Theme } from '..'
import moment from 'moment'

const RoomCard = props => {
  const
    { info, info: { filters, reservationInformation, roomSelection }, setInfo } = useContext(AppContext),

    history = useHistory(),

    roomIndex = roomSelection.rooms.length
      ? roomSelection.rooms
        .map((room, index) => (room.id.match(props.roomId) ? index : null))
        .filter((room) => room != null)[0]
      : 0,

    [showAddOns, setShowAddOns] = useState(false),
    [rate, setRate] = useState(''),
    [showOtherRates, setShowOtherRates] = useState(false),
    [rates] = useState(
      props.information
        ? props.information.roomRates
          .filter((value, index, self) => self.indexOf(value) === index)
        : [],
    ),

    iconSize = 12,
    dateDifference = moment
      .duration(
        moment(filters.reservationDates.end).diff(
          moment(filters.reservationDates.start),
        ),
      )
      .asDays(),

    cardInfo = [
      {
        icon: <BsPeople />,
        label: props.information
          ? props.information.roomAttributes.maxPax +
          props.information.roomAttributes.maxPax +
          ' people'
          : null,
      },
      {
        icon: <IoBedOutline />,
        label: props.information
          ? props.information.roomAttributes.bedsNumber
          : null,
      },
      {
        icon: <BsTextareaResize />,
        label: props.information
          ? props.information.roomAttributes.roomSize
          : null,
      },
    ],

    addAdult = () => {
      const
        addedAdult = roomSelection &&
          roomSelection.rooms &&
          roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                adults: room.adults + 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: addedAdult,
          }
        }

      setInfo(updates);
    },

    removeAdult = () => {
      const
        removedAdult = roomSelection &&
          roomSelection.rooms &&
          roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                adults: room.adults - 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: removedAdult,
          }
        }

      setInfo(updates);
    },

    addChild = () => {
      const
        addedChild = roomSelection &&
          roomSelection.rooms &&
          roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                children: room.children + 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: addedChild,
          }
        }

      setInfo(updates);
    },

    removeChild = () => {
      const
        removedChild = roomSelection &&
          roomSelection.rooms &&
          roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                children: room.children - 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: removedChild,
          }
        }

      setInfo(updates);
    },

    addtoAddOn = (addOnId) => {
      const addedAddOn =
        roomSelection &&
        roomSelection.rooms &&
        roomSelection.rooms.map((room, i) =>
          room.id.match(props.roomId) && room.addOns.length
            ? {
              ...room,
              addOns: room.addOns.map((addOn) =>
                addOn.id === addOnId
                  ? {
                    ...addOn,
                    count: addOn.count + 1,
                  }
                  : addOn,
              ),
            }
            : room,
        ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: addedAddOn,
            totalPayment: addedAddOn.length
              ? addedAddOn
                .map(
                  (room) =>
                    room.price +
                    (room.addOns.length
                      ? room.addOns
                        .map((addOn) => addOn.price * addOn.count * dateDifference)
                        .reduce((a, b) => a + b)
                      : 0),
                )
                .reduce((a, b) => a + b)
              : 0,
          },
        }
      setInfo(updates)
    },

    removefromAddOn = (addOnId) => {
      const removedAddOn =
        roomSelection &&
        roomSelection.rooms &&
        roomSelection.rooms.map((room, i) =>
          i === roomIndex && room.addOns.length
            ? {
              ...room,
              addOns: room.addOns.map((addOn) =>
                addOn.id === addOnId
                  ? {
                    ...addOn,
                    count: addOn.count - 1,
                  }
                  : addOn,
              ),
            }
            : room,
        ),
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: removedAddOn,
            totalPayment: removedAddOn.length
              ? removedAddOn
                .map(
                  (room, i) =>
                    room.price +
                    (room.addOns.length
                      ? room.addOns
                        .map((addOn) => addOn.price * addOn.count * dateDifference)
                        .reduce((a, b) => a + b)
                      : 0),
                )
                .reduce((a, b) => a + b)
              : 0,
          },
        }

      setInfo(updates)
    }

  return (
    <Grid item xs={props.count > 1 ? 11 : 12} md={6}>
      <Zoom in={true}>
        <Card
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: 'flex',
                justifyContent: 'flex-center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: '250px' },
                  height: {
                    xs: '200px',
                    sm: '100%',
                    transform: `scale(${showAddOns ? 1.25 : 1}) translateY(${showAddOns ? `-10%` : `0%`
                      }) translateX(${showAddOns ? `-10%` : `0%`})`,
                    transition: 'all ease-out .5s',
                    backgroundImage: `url("${props.img}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  },
                }}
                onClick={() => history.push(`/room-selection/
                ${props.information &&
                    props.information.roomRates.length ?
                    props.information.roomRates.map(roomRate =>
                      roomRate[3].match(rate) ?
                        roomRate[6] :
                        null
                    ).filter(roomRate =>
                      roomRate !=
                      null)[0] :
                    0}
                `)}
              />
            </Grid>
            <Grid item xs={12} sm={8} sx={{
              position: 'relative',
            }}>
              <Box p={3}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography variant="pageTitle" ml={1} sx={{ fontSize: Theme.typography.fontSizeLg }}>
                      {`${filters.currency} ` +
                        (props.information
                          ? (
                            (parseInt(
                              props.information ?
                                props.information
                                  .roomRates[0][4] : 0
                            ) +
                              (roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex].addOns
                                  .length
                                ? roomSelection.rooms[roomIndex].addOns
                                  .map((addOn) => addOn.count * addOn.price)
                                  .reduce((a, b) => a + b)
                                : 0)) *
                            filters.currencyRate
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : 1000)}
                      {dateDifference > 1 ? `/day` : ``}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} mt={-2}>
                    <Typography variant="pageTitle">
                      {rate ? rate : rates[0][3]}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -2, display: rates.length === 1 ? "none" : "" }}>
                    <Card sx={{ backgroundColor: Theme.palette.background.default, px: 2, display: showOtherRates ? "" : "none" }}>
                      {rates.map((rates, index) => (
                        <MenuItem value={rate} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2 }} onClick={() => setRate(rate[3])}>
                          <Typography>
                            {rates[3]}
                          </Typography>
                          <Typography>
                            {parseInt(rates[4]).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Card>
                    <Button fullWidth variant="text" onClick={() => setShowOtherRates(state => !state)}>
                      View Other Deals
                    </Button>
                  </Grid>

                  {cardInfo.map((i) => (
                    <Grid
                      item
                      xs={12 / cardInfo.length}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      {i.icon}
                      <Typography
                        variant="roomCardLabel"
                        sx={{ textAlign: 'center' }}
                      >
                        {i.label}
                      </Typography>
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: Theme.palette.light.main,
                        width: '100%',
                      }}
                    >
                      <Grid container>
                        {/* Adults Tab START */}
                        <Grid
                          item
                          py={2}
                          xs={6}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Box pb={2}>
                            <Typography variant="filterText">
                              {roomSelection.rooms &&
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex]
                                ? roomSelection.rooms[roomIndex].adults
                                : 0}{' '}
                              Adult
                              {roomSelection.rooms &&
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex]
                                ? roomSelection.rooms[roomIndex].adults ===
                                  1
                                  ? ''
                                  : 's'
                                : ''}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                roomSelection.rooms &&
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex] &&
                                roomSelection.rooms[roomIndex].adults <= 1
                              }
                              onClick={() =>
                                reservationInformation.room.length &&
                                  roomSelection.rooms[roomIndex].adults === 1
                                  ? ''
                                  : removeAdult()
                              }
                            >
                              <BsDash size={iconSize} />
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                props.information &&
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex].adults >=
                                props.information
                                  .roomAttributes.maxPax
                              }
                              onClick={() =>
                                props.information &&
                                  roomSelection.rooms.length &&
                                  roomSelection.rooms[roomIndex].adults >=
                                  props.information
                                    .roomAttributes.maxPax
                                  ? ''
                                  : addAdult()
                              }
                            >
                              <BsPlus size={iconSize} />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        {/* Adults Tab END */}

                        {/* Children Tab START */}
                        <Grid
                          item
                          py={2}
                          xs={6}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Box pb={2}>
                            <Typography variant="filterText">
                              {roomSelection.rooms.length ?
                                roomSelection.rooms[roomIndex].children : 0} Child{roomSelection.rooms.length &&
                                  roomSelection.rooms[roomIndex].children === 1 ? '' : 'ren'}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex].children === 0
                              }
                              onClick={() =>
                                roomSelection.rooms.length &&
                                  roomSelection.rooms[roomIndex].children === 0 ? '' : removeChild()
                              }
                            >
                              <BsDash size={iconSize} />
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                props.information &&
                                roomSelection.rooms.length &&
                                roomSelection.rooms[roomIndex].children >=
                                props.information
                                  .roomAttributes.maxChild
                              }
                              onClick={() =>
                                props.information &&
                                  roomSelection.rooms.length &&
                                  roomSelection.rooms[roomIndex].children >=
                                  props.information
                                    .roomAttributes.maxChild
                                  ? ''
                                  : addChild()
                              }
                            >
                              <BsPlus size={iconSize} />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        {/* Children Tab END */}
                      </Grid>
                    </Card>
                  </Grid>

                  <Collapse
                    in={showAddOns}
                    timeout={{ enter: 500, exit: 500 }}
                    sx={{ width: '110%' }}
                  >
                    {roomSelection.rooms.length &&
                      roomSelection.rooms[roomIndex] &&
                      roomSelection.rooms[roomIndex].addOns ? (
                      roomSelection.rooms[roomIndex].addOns.map(
                        (addOn, index) => (
                          <Box pl={3} pt={3}>
                            <Card
                              sx={{
                                backgroundColor: Theme.palette.light.main,
                                width: '100%',
                              }}
                            >
                              <Box px={3}>
                                <Grid container>
                                  {/* AddOns START */}
                                  <Grid
                                    item
                                    py={2}
                                    xs={12}
                                    sx={{ textAlign: "center" }}
                                  >
                                    <Box mb={2}>
                                      <Typography variant="filterText">
                                        {`${addOn.count ? `(${addOn.count})` : ''
                                          }`}{' '}
                                        {addOn.description}
                                      </Typography>
                                      <Box>
                                        <Typography
                                          variant="filterText"
                                          sx={{
                                            fontWeight: 400,
                                            fontStyle: 'italic',
                                            fontSize: Theme.typography.fontSizeSm,
                                          }}
                                        >
                                          {`${filters.currency} ` +
                                            (
                                              addOn.price *
                                              filters.currencyRate
                                            ).toLocaleString(undefined, {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            })}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <ButtonGroup
                                      variant="contained"
                                      sx={{ height: 22.5 }}
                                    >
                                      <Button
                                        sx={{
                                          backgroundColor:
                                            Theme.palette.background.light,
                                        }}
                                        disabled={
                                          addOn.count === 0 ? true : false
                                        }
                                        onClick={() =>
                                          reservationInformation.room
                                            .length &&
                                            reservationInformation.room
                                              .length &&
                                            addOn.count === 0
                                            ? ''
                                            : removefromAddOn(addOn.id)
                                        }
                                      >
                                        <BsDash size={iconSize} />
                                      </Button>
                                      <Button
                                        sx={{
                                          backgroundColor:
                                            Theme.palette.background.light,
                                        }}
                                        onClick={() =>
                                          reservationInformation.room
                                            .length &&
                                            reservationInformation.room
                                              .length
                                            ? addtoAddOn(addOn.id)
                                            : ''
                                        }
                                      >
                                        <BsPlus size={iconSize} />
                                      </Button>
                                    </ButtonGroup>
                                  </Grid>
                                  {/* AddOns Tab END */}
                                </Grid>
                              </Box>
                            </Card>
                          </Box>
                        ),
                      )
                    ) : (
                      <></>
                    )}
                  </Collapse>

                  <Grid item xs={12}>
                    <Button
                      sx={{
                        width: '100%',
                        fontWeight: Theme.typography.fontWeightBold,
                      }}
                      onClick={() => setShowAddOns(!showAddOns)}
                    >
                      <Box py={0}>
                        <Typography variant="roomCardButton">
                          {showAddOns ? 'Hide' : 'Show'} Add-Ons
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {props.disabled ? (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,.25)',
                    backdropFilter: 'blur(2px)',
                  }}
                ></Box>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Card>
      </Zoom>
    </Grid>
  )
}

export default RoomCard
