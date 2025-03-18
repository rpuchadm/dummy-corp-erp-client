import { useState } from "react"

import Alert from "react-bootstrap/esm/Alert"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import Spinner from "react-bootstrap/esm/Spinner"
import { FaCheckCircle, FaExclamationTriangle, FaPlus } from "react-icons/fa"

import AppConfig from "../../AppConfig"

interface IPersonAppSessionResponse {
  code: string
}

interface PersonAppSessionProps {
  iidPer: number
  iidApp: number
  client_url_callback: string
}

const PersonAppSession = ({
  iidPer,
  iidApp,
  client_url_callback,
}: PersonAppSessionProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [code, setCode] = useState<string>("")

  const handleSession = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url =
      AppConfig.API_BASE_URL + "personapp-session/" + iidPer + "/" + iidApp
    const sendPersonAppSession = async () => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify({}),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setMessage("PersonApp updated correctly")
        const personappsessionresp = data as IPersonAppSessionResponse
        if (personappsessionresp) {
          setCode(personappsessionresp.code)
        }
      }
      setIsLoading(false)
    }
    sendPersonAppSession()
  }

  const callback = client_url_callback + code
  return (
    <Card>
      <Card.Header>Start a session fot this person at this app.</Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger">
            <FaExclamationTriangle /> {error}
          </Alert>
        )}
        {code ? (
          <Alert variant="success">
            <Alert.Heading>
              <FaCheckCircle /> Session prepared to start correctly
            </Alert.Heading>
            Code: {code}
            <hr />
            <Alert.Link href={callback} target="_blank" rel="noreferrer">
              Continue with session
            </Alert.Link>
          </Alert>
        ) : (
          <Button
            disabled={!!(isLoading || message || error || code)}
            onClick={handleSession}
          >
            {isLoading ? <Spinner /> : <FaPlus />} Start session
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default PersonAppSession
