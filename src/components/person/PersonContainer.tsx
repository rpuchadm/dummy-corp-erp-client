import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IPersonData } from "./types"
import Person from "./Person"
import LPersonApp from "./LPersonApp"

const PersonContainer = ({}) => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IPersonData | null>({
    person: { dni: "", nombre: "", apellidos: "", email: "", telefono: "" },
    lpersonapp: [],
    lapp: [],
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
        setData(data as IPersonData)
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
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              {data && data.person ? (
                <Person data={data} />
              ) : (
                <Alert variant="danger">
                  <FaExclamationTriangle /> Person not found
                </Alert>
              )}
            </>
          )}
          <br />
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
      <Row>
        {data && data.lpersonapp?.length && data.lapp?.length && (
          <Col>
            <LPersonApp data={data} />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default PersonContainer
