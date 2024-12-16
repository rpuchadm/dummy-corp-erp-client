import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaEnvelope, FaExclamationTriangle } from "react-icons/fa"
import AppCoinfig from "../../AppConfig"

interface Person {
  from: string
  to: string
  subject: string
  content: string
}

const Person = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value)
  }
  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value)
  }
  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const handleSend = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)
    const url = AppCoinfig.API_BASE_URL + "send"
    const message = { from, to, subject, content }
    const sendMessage = async (message: Person) => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(message),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else if (data.message) {
        setMessage(data.message)
      }
      setIsLoading(false)
    }
    sendMessage(message)
  }

  return (
    <Form onSubmit={handleSend}>
      <Card>
        <Card.Header>Message</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFrom">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="email"
                    name="from"
                    placeholder="Enter email"
                    value={from}
                    onChange={handleFrom}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formTo">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="email"
                    name="to"
                    placeholder="Enter email"
                    value={to}
                    onChange={handleTo}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={handleSubject}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formContent">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    rows={3}
                    value={content}
                    onChange={handleContent}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          {error && (
            <Alert variant="danger">
              <FaExclamationTriangle size={20} /> {error}
            </Alert>
          )}
          {message && (
            <Alert variant="success">
              <FaEnvelope size={20} /> {message}
            </Alert>
          )}
          <Button
            disabled={!!(isLoading || message || error)}
            onClick={handleSend}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FaEnvelope />
            )}{" "}
            Send
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default Person
