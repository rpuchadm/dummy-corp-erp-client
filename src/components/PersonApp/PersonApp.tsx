import React, { useState } from "react"

import Alert from "react-bootstrap/esm/Alert"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/esm/Spinner"
import { FaCheckCircle, FaExclamationTriangle, FaSave } from "react-icons/fa"

import { IPersonAppData, IPersonApp } from "./types"
import AppConfig from "../../AppConfig"
import PersonAppSession from "./PersonAppSession"

interface PersonAppProps {
  data: IPersonAppData
  setData: React.Dispatch<React.SetStateAction<IPersonAppData>>
  iidPer: number
  iidApp: number
}

const PersonApp = ({ data, setData, iidPer, iidApp }: PersonAppProps) => {
  const personapp = data.personapp
    ? data.personapp
    : {
        id: 0,
        person_id: iidPer,
        auth_client_id: iidApp,
        profile: "",
      }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [profile, setProfile] = useState<string>(
    personapp.profile ? personapp.profile : ""
  )

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(e.target.value)
  }

  const id = personapp?.id ? personapp.id : 0
  const method = iidPer && iidApp ? "PUT" : "POST"
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppConfig.API_BASE_URL + "personapp/" + iidPer + "/" + iidApp
    const personapp: IPersonApp = {
      id,
      person_id: iidPer,
      auth_client_id: iidApp,
      profile,
    }
    const sendPersonApp = async (personapp: IPersonApp) => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: method,
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
    <>
      {!data.personapp.id && (
        <Alert variant="warning">
          <FaExclamationTriangle /> No Profile found for this person at this
          app.
        </Alert>
      )}
      {data.app.client_url_callback && (
        <>
          <PersonAppSession
            {...{ iidPer, iidApp }}
            client_url_callback={data.app.client_url_callback}
          />
          <br />
        </>
      )}
      <Form onSubmit={handleSave}>
        <Card>
          <Card.Header>Person App Profile</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formProfile">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                as={"textarea"}
                type="textarea"
                cols={40}
                rows={5}
                placeholder="Enter profile, it must be a valid JSON object"
                value={profile}
                onChange={handleProfile}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            {error && (
              <Alert variant="danger">
                <FaExclamationTriangle size={20} /> {error}
              </Alert>
            )}
            {message && (
              <Alert variant="success">
                <FaCheckCircle size={20} /> {message}
              </Alert>
            )}
            <Button
              disabled={!!(isLoading || message || error)}
              onClick={handleSave}
              variant="primary"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <FaSave />
              )}{" "}
              {personapp.id ? <>Update</> : <>Create</>}
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </>
  )
}

export default PersonApp
