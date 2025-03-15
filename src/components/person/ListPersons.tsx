import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IPerson } from "./types"

const ListPersons = () => {
  const [persons, setPersons] = useState<IPerson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "persons"
    const fetchPersons = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json().then((data) => data as IPerson[])
      setPersons(data)
      setLoading(false)
    }

    fetchPersons()
  }, [])

  return (
    <>
      <h1>
        <FaUser /> List Persons
      </h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/person/0">New Person</a>
      </p>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ListGroup>
          {persons?.map((person) => (
            <ListGroup.Item key={person.id}>
              <Card>
                <Card.Header>
                  <FaEnvelope /> Person #{person.id} -{" "}
                  {dayjs(person.created_at).format("DD/MM/YYYY HH:mm")}
                  <a href={`/person/${person.id}`} style={{ float: "right" }}>
                    Edit
                  </a>
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
