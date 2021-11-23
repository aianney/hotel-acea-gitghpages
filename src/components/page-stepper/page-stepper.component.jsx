import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext, Theme } from '..'
import { Stepper, Step, StepLabel } from '@material-ui/core'

const PageStepper = (props) => {
  // eslint-disable-next-line
  const { info, setInfo } = useContext(AppContext)
  return (
    <Stepper
      nonLinear
      activeStep={props.activeStep}
      sx={{ fontFamily: Theme.typography.fontFamily.sansSerif }}
    >
      <Step>
        <NavLink to="/room-selection">
          <StepLabel>Selecting Rooms</StepLabel>
        </NavLink>
      </Step>
      <Step>
        {Object.keys(info.guestDetails).length ? (
          <NavLink to="/guest-details">
            <StepLabel>Guest Details</StepLabel>
          </NavLink>
        ) : (
          <StepLabel>Guest Details</StepLabel>
        )}
      </Step>
      <Step>
        {!Object.keys(info.guestDetails).length ? (
          <NavLink to="/payments">
            <StepLabel>Payment</StepLabel>
          </NavLink>
        ) : (
          <StepLabel>Payment</StepLabel>
        )}
      </Step>
    </Stepper>
  )
}

export default PageStepper
