import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from "react-bootstrap/Spinner"
import AppCoinfig from "../../AppConfig"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FaEnvelope } from "react-icons/fa"

interface Person {
  id: number
  from: string
  to: string
  subject: string
  content: string
  created_at: string
}

const ListPersons = () => {
  const [messages, setMessages] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "persons"
    const fetchMessages = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json()
      setMessages(data)
      setLoading(false)
    }

    fetchMessages()
  }, [])

  return (
    <>
      <h1>
        <FaEnvelope /> List Persons
      </h1>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ListGroup>
          {messages.map((message) => (
            <ListGroup.Item key={message.id}>
              <Card>
                <Card.Header>
                  <FaEnvelope /> Message #{message.id} -{" "}
                  {dayjs(message.created_at).format("DD/MM/YYYY HH:mm")}
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <strong>From:</strong> {message.from}
                      </Col>
                      <Col md={6}>
                        <strong>To:</strong> {message.to}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Subject:</strong> {message.subject}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <small>{message.content}</small>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}

export default ListPersons
