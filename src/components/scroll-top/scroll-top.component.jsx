import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
    // eslint-disable-next-line
  }, [])

  return null
}

export default withRouter(ScrollTop)
