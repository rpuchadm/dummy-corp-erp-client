import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from "react-bootstrap/Spinner"
import AppCoinfig from "../../AppConfig"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"

interface Person {
  id: number
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  created_at: string
}

const ListPersons = () => {
  const [persons, setPersons] = useState<Person[]>([])
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
      setPersons(data)
      setLoading(false)
    }

    fetchMessages()
  }, [])

  return (
    <>
      <h1>
        <FaUser /> List Persons
      </h1>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ListGroup>
          {persons.map((person) => (
            <ListGroup.Item key={person.id}>
              <Card>
                <Card.Header>
                  <FaEnvelope /> Person #{person.id} -{" "}
                  {dayjs(person.created_at).format("DD/MM/YYYY HH:mm")}
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <strong>Dni:</strong> {person.dni}
                      </Col>
                      <Col md={6}>
                        <strong>Nombre:</strong> {person.nombre}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Apellidos:</strong> {person.apellidos}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <small>
                          <FaEnvelope /> {person.email}
                        </small>
                      </Col>
                      <Col>
                        <small>
                          <FaPhone /> {person.telefono}
                        </small>
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
