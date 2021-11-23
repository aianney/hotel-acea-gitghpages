import React, { useContext, useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import dataCountries from './data-countries.component'
import { AppContext } from '../..'

const Nationality = () => {
  const { info, setInfo } = useContext(AppContext),
    // [country, setCountry] = useState('Philippines'),
    [nationality, setNationality] = useState('Philippines')

  // const handleNationality = (nationality) => {
  //   setNationality(nationality.target.value)
  // }

  useEffect(() => {
    setInfo({
      ...info,
      guestDetails: {
        ...info.guestDetails,
        nationality,
      },
    })
    // eslint-disable-next-line
  }, [nationality])

  return (
    <FormControl fullWidth>
      <InputLabel id="philippines">Nationality</InputLabel>
      <Select
        fullWidth
        labelId="philippines"
        label="Nationality"
        value={nationality}
        onChange={(selectedCountry, i) => {
          setNationality(selectedCountry.target.value)
        }}
        // onChange={(e) => setNationality(e.target.value)}
      >
        {dataCountries.map((nationality) => (
          <MenuItem value={nationality.label}>
            <Box
              component="img"
              src={`https://flagcdn.com/w20/${nationality.code.toLowerCase()}.png`}
              mr={2}
            />
            {nationality.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default Nationality
