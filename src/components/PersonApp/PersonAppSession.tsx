import { useState } from "react"

import Alert from "react-bootstrap/esm/Alert"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import Spinner from "react-bootstrap/esm/Spinner"
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa"

import AppConfig from "../../AppConfig"
import { IPersonAppData, IPersonApp } from "./types"

interface PersonAppSessionProps {
  iidPer: number
  iidApp: number
}

const PersonAppSession = ({ iidPer, iidApp }: PersonAppSessionProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [session, setSession] = useState<string>("")

  const handleSession = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url =
      AppConfig.API_BASE_URL + "personapp-session/" + iidPer + "/" + iidApp
    const personapp: IPersonApp = {
      id,
      person_id: iidPer,
      auth_client_id: iidApp,
      profile,
    }
    const sendPersonApp = async (personapp: IPersonApp) => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(personapp),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setMessage("PersonApp updated correctly")
        const personapp = data as IPersonApp
        if (personapp) {
          setData((prev) => {
            return {
              ...prev,
              personapp,
            }
          })
        }
      }
      setIsLoading(false)
    }
    sendPersonApp(personapp)
  }

  return (
    <Card>
      <Card.Header>Start a session fot this person at this app.</Card.Header>
      <Card.Body>
        <Button
          disabled={!!(isLoading || message || error || session)}
          onClick={handleSession}
        >
          {isLoading ? <Spinner /> : <FaPlus />} Start session
        </Button>
        {error && (
          <Alert variant="danger">
            <FaExclamationTriangle /> {error}
          </Alert>
        )}
        {session && (
          <Alert variant="success">
            <FaCheckCircle /> {session}
          </Alert>
        )}
      </Card.Body>
    </Card>
  )
}

export default PersonAppSession
