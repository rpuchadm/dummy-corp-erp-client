import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"

import AppConfig from "../../AppConfig"

import { IApplication } from "./types"
import { FaAppStore, FaExclamationTriangle } from "react-icons/fa"

interface ApplicationProps {
  application: IApplication
}
const Application = ({ application }: ApplicationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [client_id, setClient_id] = useState<string>(application.client_id)
  const [client_url, setClient_url] = useState<string>(application.client_url)
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
    const application = { id, client_id, client_url }
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
      } else if (data.message) {
        setMessage(data.message)
      }
      setIsLoading(false)
    }
    sendApplication(application)
  }

  return (
    <>
      <h1>Create Application</h1>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formBasicClient_id">
          <Form.Label>Client ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter client ID"
            value={client_id}
            onChange={handleClient_id}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicClient_url">
          <Form.Label>Client URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter client URL"
            value={client_url}
            onChange={handleClient_url}
          />
        </Form.Group>
        {error && (
          <Alert variant="danger">
            <FaExclamationTriangle size={20} /> {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success">
            <FaAppStore size={20} /> {message}
          </Alert>
        )}
        <Button
          disabled={!!(isLoading || message || error)}
          onClick={handleSave}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <FaAppStore />
          )}{" "}
          {application.id ? <>Update</> : <>Create</>}
        </Button>
      </Form>
    </>
  )
}

export default Application
