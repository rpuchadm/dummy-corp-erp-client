import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaCheckCircle, FaExclamationTriangle, FaUser } from "react-icons/fa"

import AppConfig from "../../AppConfig"
import { IPerson, IPersonData } from "./types"

interface PersonProps {
  data: IPersonData
}

const Person = ({ data }: PersonProps) => {
  const person = data.person
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [dni, setDni] = useState<string>(person.dni)
  const [nombre, setNombre] = useState<string>(person.nombre)
  const [apellidos, setApellidos] = useState<string>(person.apellidos)
  const [email, setEmail] = useState<string>(person.email)
  const [telefono, setTelefono] = useState<string>(person.telefono)
  const handleDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value)
  }
  const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }
  const handleApellidos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellidos(e.target.value)
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value)
  }
  const id = person?.id ? person.id : 0
  const method = id ? "PUT" : "POST"
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppConfig.API_BASE_URL + "person/" + id
    const person = { id, dni, nombre, apellidos, email, telefono }
    const sendPerson = async (person: IPerson) => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(person),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else if (data.message) {
        setMessage(data.message)
      }
      setIsLoading(false)
    }
    sendPerson(person)
  }

  return (
    <Form onSubmit={handleSave}>
      <Card>
        <Card.Header>Person</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDni">
                  <Form.Label>Dni</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="Enter DNI"
                    value={dni}
                    onChange={handleDni}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Enter Nombre"
                    value={nombre}
                    onChange={handleNombre}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formApellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    placeholder="Enter Apellidos"
                    value={apellidos}
                    onChange={handleApellidos}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmail}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    placeholder="Enter Teléfono"
                    value={telefono}
                    onChange={handleTelefono}
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
              <FaCheckCircle size={20} /> {message}
            </Alert>
          )}
          <Button
            disabled={!!(isLoading || message || error)}
            onClick={handleSave}
            variant="primary"
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : <FaUser />}{" "}
            {person.id ? <>Update</> : <>Create</>}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default Person
