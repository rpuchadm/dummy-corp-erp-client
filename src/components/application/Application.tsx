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

const Application = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [client_id, setClient_id] = useState<string>("")
  const [client_url, setClient_url] = useState<string>("")
  const handleClient_id = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient_id(e.target.value)
  }
  const handleClient_url = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient_url(e.target.value)
  }
  const handleCreate = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)
    const url = AppConfig.API_BASE_URL + "application"
    const application = { client_id, client_url }
    const sendApplication = async (application: IApplication) => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(application),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage("Application created")
        setError("")
      } else {
        setMessage("")
        setError(data.application)
      }
      setIsLoading(false)
    }
    sendApplication(application)
  }

  return (
    <>
      <h1>Create Application</h1>
      <Form onSubmit={handleCreate}>
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
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Form>
      {message ? <Alert variant="success">{message}</Alert> : null}
      {error ? <Alert variant="danger">{error}</Alert> : null}
    </>
  )
}

export default Application
