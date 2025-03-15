import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"

import AppConfig from "../../AppConfig"

import { IApplication, IApplicationData } from "./types"
import {
  FaAppStore,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa"
import { Card } from "react-bootstrap"

interface ApplicationProps {
  data: IApplicationData
  setData: React.Dispatch<React.SetStateAction<IApplicationData | null>>
}
const Application = ({ data, setData }: ApplicationProps) => {
  const application = data.application
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [client_id, setClient_id] = useState<string>(application.client_id)
  const [client_url, setClient_url] = useState<string>(application.client_url)
  const [client_url_callback, setClient_url_callback] = useState<string>(
    application.client_url_callback ? application.client_url_callback : ""
  )
  const handleClient_id = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient_id(e.target.value)
  }
  const handleClient_url = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient_url(e.target.value)
  }
  const id = application?.id ? application.id : 0
  const method = id ? "PUT" : "POST"
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppConfig.API_BASE_URL + "application/" + id
    const application = { id, client_id, client_url, client_url_callback }
    const sendApplication = async (application: IApplication) => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(application),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setMessage("Cliente atualizado correctamente")
        const application = data as IApplication
        setData((prev) => {
          return {
            ...prev,
            application,
          }
        })
      }
      setIsLoading(false)
    }
    sendApplication(application)
  }

  return (
    <Card>
      <Card.Header>
        <FaAppStore /> Application
      </Card.Header>

      <Form onSubmit={handleSave}>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formBasicClient_id">
            <Form.Label>Client ID (*)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter client ID"
              value={client_id}
              onChange={handleClient_id}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicClient_url">
            <Form.Label>Client URL (*)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter client URL"
              value={client_url}
              onChange={handleClient_url}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicClient_url_callback">
            <Form.Label>Client URL Callback</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter client URL Callback"
              value={client_url_callback}
              onChange={(e) => setClient_url_callback(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicClient_secret">
            <Form.Label>Client Secret</Form.Label>
            <Form.Control
              type="text"
              value={application.client_secret}
              readOnly
            />
            <Form.Text className="text-muted">
              <span style={{ color: "red" }}>
                This is a secret key that should not be shared.
                <br />
                IMPORTANT: Every time you save the application, a new secret key
                is generated if callback URL is defined.
              </span>
            </Form.Text>
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
              <FaAppStore />
            )}{" "}
            {application.id ? <>Update</> : <>Create</>}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}

export default Application
