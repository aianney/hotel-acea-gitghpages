import React, { useState, useEffect, useContext, useRef } from 'react'
import { TextField, Grid } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { AppContext } from '../..'
import './birthdate.styles.css'

const Birthdate = (props) => {
  const isInitialMount = useRef(true),
    { info, setInfo } = useContext(AppContext),
    [birthdate, setBirthdate] = useState(''),
    [birthdateOpen, setBirthdateOpen] = useState(false),
    date = new Date(),
    updateBirthday = () => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          birthdate,
        },
      })
    }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      updateBirthday()
    }
    // eslint-disable-next-line
  }, [birthdate])

  return (
    <LocalizationProvider
      dateAdapter={DateFnsUtils}
      // style={{ width: '100%' }}
    >
      <MobileDatePicker
        // style={{ width: '100%', borderRadius: '20' }}
        showToolbar={false}
        onChange={() => {}}
        onAccept={(newValue) => {
          setBirthdate(newValue)
        }}
        onClose={() => setBirthdateOpen(false)}
        open={birthdateOpen}
        maxDate={date.setFullYear(date.getFullYear() - 18)}
        openTo="year"
        views={['year', 'month', 'day']}
        // eslint-disable-next-line
        open={birthdateOpen}
        renderInput={({
          ref,
          inputProps,
          disabled,
          onChange,
          value,
          ...other
        }) => (
          <Grid ref={ref} {...other} item>
            <TextField
              style={{ width: '100%' }}
              fullWidth
              helperText={props.errorBirthday}
              error={props.errorBirthday}
              variant="outlined"
              label="Birthday*"
              readOnly
              ref={ref}
              onChange={onChange}
              value={birthdate ? moment(birthdate).format('MMMM DD, YYYY') : ''}
              onClick={() => setBirthdateOpen(true)}
              sx={{
                borderRadius: '4px',
              }}
            />
          </Grid>
        )}
        value={birthdate}
      />
    </LocalizationProvider>
  )
}

export default Birthdate
