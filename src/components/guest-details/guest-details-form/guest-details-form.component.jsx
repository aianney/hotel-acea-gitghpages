import React, { useState, useContext } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router'
import BirthdatePicker from '../birthdate/birthdate.component'
import Theme from '../../theme/theme.component'
import { AppContext, CustomButton, Nationality, RegionCountry } from '../..'
//import axios from "axios"

const GuestDetailsForm = () => {
  const [errorFirstName, setErrorFirstName] = useState(''),
    [errorLastName, setErrorLastName] = useState(''),
    [errorPhoneNumber, setErrorPhoneNumber] = useState(''),
    [errorEmail, setErrorEmail] = useState(''),
    [errorBirthday, setErrorBirthday] = useState(''),
    { info, setInfo } = useContext(AppContext),
    history = useHistory(),
    regexName = new RegExp(/^[a-zA-Z ]*$/),
    // eslint-disable-next-line
    regexNumber = new RegExp(
      // eslint-disable-next-line
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    ),
    // eslint-disable-next-line
    regexEmail = new RegExp(
      // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    ),
    // First Name Handler
    handlefirstNameInputChange = (e) => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          firstName: e.target.value,
        },
      })

      !e.target.value
        ? setErrorFirstName('First Name is Required')
        : !regexName.test(e.target.value)
        ? setErrorFirstName('First Name is Invalid')
        : setErrorFirstName('')
    },
    // Last Name Handler
    handleLastnameInputChange = (e) => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          lastName: e.target.value,
        },
      })

      !e.target.value
        ? setErrorLastName('Last Name is Required')
        : !regexName.test(e.target.value)
        ? setErrorLastName('invalid')
        : setErrorLastName('')
    },
    // Phone Number Handler
    handleMobilePhoneNumberInputChange = (e) => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          phoneNumber: e.target.value,
        },
      })

      !e.target.value
        ? setErrorPhoneNumber('Phone Number is Required')
        : !regexNumber.test(e.target.value)
        ? setErrorPhoneNumber('Input is Not a Phone Number')
        : e.target.value.length <= 10
        ? setErrorPhoneNumber('Invalid Phone Number')
        : setErrorPhoneNumber('')
    },
    // Email Handler
    handleEmailInputChange = (e) => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          email: e.target.value,
        },
      })

      !e.target.value
        ? setErrorEmail('Email is Required')
        : !regexEmail.test(e.target.value)
        ? setErrorEmail('Invalid Email')
        : setErrorEmail('')
    },
    // Nationality Handler
    handleNationalityInputChange = (e) =>
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          nationality: e.target.value,
        },
      }),
    // Home Address Handler
    handleHomeAddressInputChange = (e) =>
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          Address: e.target.value,
        },
      }),
    // MessageHandler
    handleMessageInputChange = (e) =>
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          message: e.target.value,
        },
      })

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   const postData = {
  //     userCredentials,
  //   }
  //   axios
  //     .post(
  //       `https://hotelreservations.ph/gpDBProcess/process.php?request=insertData&data=qq/` +
  //       JSON.stringify(userCredentials),
  //       postData,
  //     )
  //     .then((response) => {
  //       console.log(response)
  //     })

  //   if (
  //     // userCredentials.firstName
  //     // userCredentials.lastName &&
  //     // userCredentials.number &&
  //     userCredentials.email
  //   ) {
  //     history.push(`/payments`, { userCredentials })
  //   } else {
  //     console.log("invalid", userCredentials)
  //   }
  // }

  return (
    <>
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
              <Typography variant="pageTitle">Guest Details</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="pageSubtitle">
                Fill in the following details to proceed to payment
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mx: { xs: 0, sm: 3 }, mb: { xs: 10, sm: 16 } }}>
        <Card
          sx={{
            backgroundColor: Theme.palette.light,
            fontFamily: Theme.typography.body1,
            padding: 2,
          }}
        >
          {/* {
            JSON.stringify(info.guestDetails)
          } */}
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                  type="first name"
                  name="first name"
                  helperText={errorFirstName}
                  error={errorFirstName}
                  value={info.guestDetails ? info.guestDetails.firstName : ''}
                  onChange={handlefirstNameInputChange}
                  placeholder="Enter first name"
                  label="First Name"
                  variant="outlined"
                  inputProps={{ maxLength: 120, autoComplete: 'off' }}
                  // autoComplete="off"
                  // autoFocus={true}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                  type="last name"
                  name="last name"
                  helperText={errorLastName}
                  error={errorLastName}
                  value={info.guestDetails ? info.guestDetails.lastName : ''}
                  onChange={handleLastnameInputChange}
                  placeholder="Enter last name"
                  label="Last Name*"
                  variant="outlined"
                  autoComplete="off"
                  inputProps={{ maxLength: 120, autoComplete: 'off' }}
                  // autoFocus={true}
                  fullWidth
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Nationality onChange={handleNationalityInputChange} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                  type="text"
                  name="number"
                  helperText={errorPhoneNumber}
                  error={errorPhoneNumber}
                  value={info.guestDetails ? info.guestDetails.number : ''}
                  onChange={handleMobilePhoneNumberInputChange}
                  placeholder="Enter mobile phone number"
                  label="Mobile Phone Number*"
                  variant="outlined"
                  // autoComplete="off"
                  inputProps={{ maxLength: 15, autoComplete: 'off' }}
                  // autoFocus={true}
                  fullWidth
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                  type="email"
                  name="email"
                  helperText={errorEmail}
                  error={errorEmail}
                  value={info.guestDetails ? info.guestDetails.email : ''}
                  onChange={handleEmailInputChange}
                  placeholder="Enter your Email Address"
                  label="Email*"
                  inputProps={{ autoComplete: 'off' }}
                  // autoComplete="off"
                  variant="outlined"
                  // autoFocus={true}
                  fullWidth
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <BirthdatePicker
                  errorBirthday={errorBirthday}
                  setErrorBirthday={setErrorBirthday}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="house no."
                  value={info.guestDetails ? info.guestDetails.homeaddress : ''}
                  onChange={handleHomeAddressInputChange}
                  placeholder="House No"
                  label="House No/Street/Subd."
                  variant="outlined"
                  inputProps={{ autoComplete: 'off' }}
                  // autoComplete="off"
                  // autoFocus={true}
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12}>
                <RegionCountry />
                {/* <CountryState /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                  type="text"
                  name="message"
                  value={info.guestDetails ? info.guestDetails.message : ''}
                  onChange={handleMessageInputChange}
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Type your message here"
                  variant="outlined"
                  inputProps={{ autoComplete: 'off' }}
                  // autoFocus={true}
                  fullWidth
                  //required
                />
              </Grid>
            </Grid>
            <CustomButton
              disabled={
                errorFirstName || errorLastName
                // errorPhoneNumber ||
                // errorEmail ||
                // errorBirthday ||
                // !info.guestDetails.region ||
                // !info.guestDetails.birthdate
              }
              onClick={() => history.push('/payments')}
            >
              Proceed
            </CustomButton>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default GuestDetailsForm
