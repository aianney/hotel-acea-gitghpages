import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import { AppContext } from '../../components'
import './payment.styles.css'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import PaymentPrice from '../../components/payment-method/payment-price/payment-price.component'
//import PaymentOption from '../../components/payment-method/payment-options/payment-options.component'
//import PaymentButton from '../../components/payment-method/payment-button/payment-button.component'

const PaymentPage = ({ handlePressGuestDetails, ...rest }) => {
  const {
    info: guestDetails,
    payment,
    roomSelection,
    filters,
    reservationDates,
    reservationInformation,
  } = useContext(AppContext)

  console.log(
    JSON.stringify({
      guestDetails,
      payment,
      roomSelection,
      filters,
      reservationDates,
      reservationInformation,
    }),
  )

  return (
    <>
      {/* <Box mb={-6} px={2}> */}
      {/* {console.log(info.roomSelection)} */}
      <Box my={4}>
        <PageStepper activeStep={2} onClick={handlePressGuestDetails} />
      </Box>
      <PaymentContent />
      <PaymentPrice />
    </>
  )
}

export default PaymentPage
