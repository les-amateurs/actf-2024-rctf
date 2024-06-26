import { useEffect, useState } from 'preact/hooks'
import Error from './error'
import config from '../config'
import { verify } from '../api/auth'
import PendingToken from '../components/pending-token'

const Verify = () => {
  console.log("Scuffed debug verify message");
  const [authToken, setAuthToken] = useState(null)
  const [emailSet, setEmailSet] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = `Verify | ${config.ctfName}`

    ;(async () => {
      const qs = new URLSearchParams(location.search)
      if (qs.has('token')) {
        console.log("Attempting to verify with token...");
        const verifyRes = await verify({ verifyToken: qs.get('token') })
        if (verifyRes.authToken) {
          setAuthToken(verifyRes.authToken)
        } else if (verifyRes.emailSet) {
          // console.log("set email");
          setEmailSet(true)
        } else {
          setError(verifyRes.verifyToken)
        }
      } else {
        console.warn("it seems like you visited the verify page without a token");
      }
    })()

    console.log("launched async verify");
  }, [])

  if (error) {
    return <Error error='401' message={error} />
  }
  if (emailSet) {
    return (
      <div class='row u-center'>
        <h3>The email change has been verified. You can now close this tab.</h3>
      </div>
    )
  }
  return <PendingToken authToken={authToken} />
}

export default Verify
