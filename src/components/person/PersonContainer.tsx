import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaEnvelope, FaExclamationTriangle, FaUser } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IPerson } from "./types"
import Person from "./Person"

const PersonContainer = ({}) => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IPerson | null>({
    dni: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "person/" + id
    const fetchPerson = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json()

      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setData(data as IPerson)
      }
      setIsLoading(false)
    }
    const iid = id ? parseInt(id) : 0
    if (iid) {
      setIsLoading(true)
      fetchPerson()
    }
  }, [id])

  return (
    <Container>
      <Row>
        <Col>
          {isLoading || !data ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Person person={data} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {error && (
            <Alert variant="danger">
              <FaExclamationTriangle /> {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PersonContainer
