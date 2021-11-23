import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext, RoomCard, Theme } from '..'
import { Box, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { BsInfoCircle, BsDash, BsPlus } from 'react-icons/bs'
import DeluxeSeaViewImage from '../../assets/media/images/deluxe-sea-view.png'
import moment from "moment"

const Room = (props) => {
  const { info, info: { filters, reservationInformation, roomSelection }, setInfo } = useContext(AppContext),
    defaults = {
      room: {
        adults: filters.guests.adults > reservationInformation.room[props.index].roomAttributes.maxPax ?
          reservationInformation.room[props.index].roomAttributes.maxPax :
          filters.guests.adults,
        children: filters.guests.children > reservationInformation.room[props.index].roomAttributes.maxChild ?
        reservationInformation.room[props.index].roomAttributes.maxChild :
        filters.guests.children,
        addOns: reservationInformation
          ? reservationInformation.addOnList
            .map((addOn) => {
              const addOnTemplate = {
                id: addOn.id,
                description: addOn.descr,
                price: parseInt(addOn.price),
                count: 0,
              }
              return addOnTemplate
            })
            .sort()
          : null,
      },
    },
    dateDifference = moment
      .duration(
        moment(filters.reservationDates.end).diff(
          moment(filters.reservationDates.start),
        ),
      )
      .asDays(),


    addRoom = (index) => {
      const newRoom = {
        ...defaults.room,
        id: reservationInformation
          ? `${roomSelection.rooms.length}-${reservationInformation.room[index].roomType}`
          : null,
        price: reservationInformation
          ? reservationInformation.room[index].roomRates
            .filter((e) => e[3])
            .map((e) => parseFloat(e[4]))
            .reduce((a, b) => a + b)
          : 0,
        rate: reservationInformation
          ? reservationInformation.room[index].roomRates[0][3]
          : 0,
      },
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: [...roomSelection.rooms, newRoom],
            totalPayment: roomSelection.totalPayment + newRoom.price,
          },
        }
      setInfo(updates)
    },
    removeRoom = (index) => {
      const roomRemoved = roomSelection.rooms.length
        ? roomSelection.rooms
          .map((room, i) => (i === index ? null : room))
          .filter((e) => e)
        : [],
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: roomRemoved,
            totalPayment:
              roomSelection.totalPayment -
              (roomSelection.rooms.length
                ? roomSelection.rooms
                  .map((room, i) =>
                    i === index
                      ? room.price +
                      (room.addOns.length
                        ? room.addOns
                          .map((addOn) => addOn.count * addOn.price * dateDifference)
                          .reduce((a, b) => a + b)
                        : 0)
                      : 0,
                  )
                  .reduce((a, b) => a + b)
                : 0),
          },
        }

      setInfo(updates)
    },
    iconSize = 15

  return (
    <>
      <Box
        mb={reservationInformation &&
          reservationInformation.room.length === props.index + 1 ?
          16 :
          4}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            mb={-3}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Box mx={3}>
              <Typography
                variant="filterLabel"
                sx={{ textAlign: 'end', width: '100%' }}
              >
                No. of Rooms:
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            px={3}
            xs={12}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box pl={3}>
              <NavLink
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                to={`/room-selection/${props.information.roomRates.length ? props.information.roomRates[0][6] : 0}`}
              >
                <Typography variant="roomTypeTitle" mr={2}>
                  {props.information.roomAttributes.roomName}
                </Typography>
                <BsInfoCircle
                  size={iconSize}
                  style={{ color: Theme.palette.primary.main }}
                />
              </NavLink>
            </Box>
            <Box>
              <ButtonGroup variant="contained">
                <Button
                  sx={{
                    backgroundColor: Theme.palette.background.light,
                  }}
                  onClick={() =>
                    removeRoom(
                      roomSelection.rooms.length
                        ? roomSelection.rooms
                          .map((room, index) =>
                            room.id.includes(
                              props.information
                                ? props.information.roomType
                                : '',
                            )
                              ? index
                              : null,
                          )
                          .filter((room) => room != null)
                          .at(-1)
                        : '',
                    )
                  }
                  disabled={
                    roomSelection.rooms.length &&
                    !roomSelection.rooms.filter((room) =>
                      room.id.includes(props.information.roomType),
                    ).length
                  }
                >
                  <BsDash size={iconSize} />
                </Button>
                <Button
                  sx={{
                    backgroundColor: Theme.palette.light.main,
                  }}
                >
                  {roomSelection.rooms && roomSelection.rooms.length
                    ? roomSelection.rooms.filter((room) =>
                      room.id.includes(props.information.roomType),
                    ).length
                    : 0}
                </Button>
                <Button
                  sx={{
                    backgroundColor: Theme.palette.background.light,
                  }}
                  onClick={() => addRoom(props.index)}
                  disabled={
                    props.information &&
                      roomSelection.rooms.length &&
                      roomSelection.rooms.filter((room) =>
                        room.id.includes('DSV'),
                      ).length >=
                      reservationInformation.room[props.index].available
                      ? true
                      : false
                  }
                >
                  <BsPlus />
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              px={3}
              spacing={2}
              sx={{
                display: {
                  xs: 'iflex',
                  md: '',
                },
                overflowX: {
                  xs: 'scroll',
                  md: 'auto',
                },
                flexWrap: {
                  xs: 'nowrap',
                  md: 'wrap',
                },
              }}
            >
              {!roomSelection.rooms.filter((room) =>
                room.id.includes(props.information.roomType),
              ).length ? (
                <RoomCard
                  disabled={true}
                  img={DeluxeSeaViewImage}
                  information={props.information}
                  id={props.index}
                />
              ) : (
                roomSelection.rooms
                  .filter((room) =>
                    room.id.includes(props.information.roomType),
                  )
                  .map((data, index) => (
                    <RoomCard
                      key={data.id}
                      img={DeluxeSeaViewImage}
                      roomType={props.information.roomType}
                      information={props.information}
                      index={index}
                      roomId={data.id}
                      data={data}
                      count={
                        roomSelection.rooms.filter((e) =>
                          e.id.includes(props.information.roomType),
                        ).length
                      }
                      id={props.index}
                    />
                  ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Room
