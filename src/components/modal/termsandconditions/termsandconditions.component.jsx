import React from 'react'
import { Grid, Modal, Typography, Box, IconButton } from '@material-ui/core'
import CancelIcon from '@mui/icons-material/Cancel'

export default function TermsAndCondition() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Grid xs={12}>
        <Typography
          style={{ color: '#71c7b8', cursor: 'pointer' }}
          onClick={handleOpen}
          variant="priceBreakdownTitle"
          sx={{ fontSize: { md: 20, xs: 16 } }}
        >
          I agree to the Terms and Conditions
        </Typography>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: 550, xs: 350 },
              height: { md: 550, xs: 650 },
              lineHeight: { sx: 1.9 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 1,
              marginRight: 2,
              overflowY: 'auto',
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <IconButton color="error" sx={{ width: 'auto' }}>
                <CancelIcon style={{ fontSize: 30 }} onClick={handleClose} />
              </IconButton>
            </Grid>
            <Typography
              mt={-3}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              TERMS AND CONDITIONS
            </Typography>
            <Grid item xs={12}>
              <Typography
                sx={{
                  lineHeight: { sx: 1.9 },
                }}
                id="modal-modal-description"
              >
                <ul>
                  <li> Room rates are quoted in Philippine Peso.</li>
                  <li>
                    Room rates are inclusive of service charges and taxes.
                  </li>
                  <li>Check-in time is 2:00 pm. Check-out is 12:00 noon.</li>
                  <li>
                    Payment for SBMA Environmental Fee (ETAF) of 100.00 net per
                    room per night on top of room rates and incidental deposit.
                  </li>
                  <li>
                    Guarantedd reservations are required. The full payment is
                    payable at booking time via Devit or Credit Card
                  </li>
                  <li>
                    The 72 hours free cancellation period is from the time of
                    arrival date.
                  </li>
                  <li>
                    After the 72-hour cancelation, a full charge will incur
                  </li>
                  <li>No refund for No Show and Shortened Stay</li>
                  <li>
                    Amendment to reservations is allowed 72 hours prior to
                    arrival. However, room rate difference may apply and is
                    subject to availability.
                  </li>
                  <li>
                    Only children 6 years old and under are allowed to share a
                    bed in their parents' room with free breakfast.
                  </li>
                  <li>
                    Only children from 7-12 years old are allowed to share a bed
                    in their parents' room for free, and with a 50% discount on
                    breakfast.
                  </li>
                  <li>
                    An incidental deposit of PHP 2,000/night will be required
                    upon check-in. This inspection of the accomodation.
                  </li>
                  <li>
                    A valid identification card must be presented upon check-in
                  </li>
                  <li>
                    Reservations made under the promo rate are non refundable.
                  </li>
                </ul>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  House Rules
                </Typography>
                <Grid item xs={12}>
                  <ul>
                    <li>
                      All guests arriving must, under government regulations,
                      register with the resort's Front Desk. Check-in time is at
                      2:00 pm and check-out time is at 12:00nn. Should you wish
                      to stay beyond the designated check-out time, please
                      inform the Front Desk. Late Checkout is subject to an
                      additional charge. Early check-in is subject to
                      availability.
                    </li>
                    <li>
                      All visitors of guests must head to the Front Desk to
                      register. If they wish to go up to the guest's room, for
                      purposes of safety and security, visitors shall be asked
                      to pay the corresponding extra-person charge beyond 10:00
                      PM.
                    </li>
                    <li>
                      The resort discourages any unofficial dealings between
                      guests and Resort staff. The Resort shall not be liable
                      for such transactions.
                    </li>
                    <li>
                      Proper courtesy must be observed at all times. The privacy
                      of other guests must be respected.
                    </li>
                    <li>
                      Money, valuables, and important documents must be kept in
                      the safety deposit box located inside your closet or at
                      the Resort's Front Desk. The resort will not be held
                      liable for any loss
                    </li>
                    <li>Cooking in guests rooms is strickly prohibited.</li>
                    <li>
                      Gambling and possession of illegal drugs is not allowed
                      within the Resort premises.
                    </li>
                    <li>
                      Guests are not allowed to bring pets to the Resort
                      premises.
                    </li>
                    <li>
                      The interior decorations of all rooms are fixed. Please
                      course request through housekeeping for any changes in the
                      room configuration.
                    </li>
                    <li>
                      Towels, linens, and appliances should not be brought out
                      nor transferred to another room to avoid unnecessary
                      charges.
                    </li>
                    <li>
                      Amenities are provided for your comfort during your stay.
                      Should you wish to purchase any of theses terms, please
                      call the Front Desk.
                    </li>
                    <li>
                      Any damage to the Resort property made by the guests or
                      their visitors will be the responsibility of the
                      registered guests.
                    </li>
                    <li>
                      All rooms are non-smoking rooms. A fine of Php 5,000 shall
                      be charged for guests' failure to comply.
                    </li>
                    <li>
                      If a guest gets ill during the stay, the management mut be
                      informed so that the necessary arrangements with a doctor
                      or hospital be made.
                    </li>
                    <li>
                      Please turn off the or unplug all equipement (such as
                      air-contitioning units, charges, or any appliances that
                      generate electricity consumption) when not in use.
                    </li>
                    <li>
                      A corkage fee of 200% will be charge for outside food and
                      drinks that are consumed in the vicinity especially the
                      beachfront area. Thus, a cooler is also not allowed inside
                      the peripheries.
                    </li>
                    <li>
                      A valid identification card must be presented upon
                      checin-in
                    </li>
                  </ul>
                </Grid>
              </Typography>
              {/* <Box mb={1} mt={5}>
                <Grid
                  item
                  xs={12}
                  mb={-5}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    variant="navigationButton"
                    sx={{
                      borderRadius: Theme.shape.borderRadius,
                    }}
                    onClick={handleClose}
                    // className="button-agreed"
                  >
                    Agreed
                  </Button>
                </Grid> */}
              {/* <Grid
                  item
                  xs={12}
                  mt={-3}
                  sx={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <Button
                    variant="navigationButton"
                    sx={{
                      borderRadius: Theme.shape.borderRadius,
                      cursor: 'pointer',
                    }}
                    onClick={handleClose}
                    // className="button-cancel"
                  >
                    Cancel
                  </Button>
                </Grid> */}
              {/* </Box> */}
            </Grid>
          </Box>
        </Modal>
      </Grid>
    </>
  )
}
