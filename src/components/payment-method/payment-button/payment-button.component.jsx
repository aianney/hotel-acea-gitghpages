import React from 'react'
import axios from 'axios'
import CustomButton from '../../custom-button/custom-button.component'
import { AppContext } from '../../../components'
import { Box } from '@material-ui/core'
import './paymentbutton.styles.css'

function PaymentButton(props) {
  const { info } = React.useContext(AppContext)

  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!success) return

    //// redirect ka sa success page or home or kung saan mo gusto
    console.log('submission success, redirect to success page')
  }, [success])

  const handleSubmit = async (e) => {
    setLoading(true)

    e.preventDefault()

    // requests checkout url
    try {
      const config = {
        method: 'post',
        url: `https://hotelreservations.ph/gpDBProcess/process.php?request=insertData&data=qq/${JSON.stringify(
          info,
        )}`,
      }

      const { data } = await axios(config)
      console.log({ data })
      /// kapag yung data ay hindi 'undefined' successful yung request

      setLoading(false)
      setSuccess(true)
    } catch (error) {
      /// sa block na to, since hindi nag throw ng error, dapat na save na yung data na JSON
      setLoading(false)
      setError(error.message)
      console.log('submit error: ', { error })
    }
  }
  return (
    <React.Fragment>
      {loading && <p>loading payment...</p>}

      {success && <p style={{ color: 'green' }}>Submission is successful</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Box mt={-5}>
        <form onSubmit={handleSubmit}>
          {loading && <p style={{ color: 'orange' }}>processing...</p>}

          <CustomButton
            type="submit"
            variant="outlined"
            // startIcon={<PaymentIcon />}
          >
            {loading ? 'processing...' : 'Pay Now'}
          </CustomButton>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default PaymentButton
