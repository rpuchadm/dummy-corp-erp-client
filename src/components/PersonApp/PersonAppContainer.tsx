import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Alert from "react-bootstrap/Alert"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"

import AppConfig from "../../AppConfig"
import { IPersonAppData } from "./types"
import { FaAppStore, FaExclamationTriangle, FaUser } from "react-icons/fa"
import PersonApp from "./PersonApp"

const PersonAppContainer = ({}) => {
  // vienen dos parametros como /personapp/1/2
  const { idper, idapp } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IPersonAppData>({
    personapp: { person_id: "", application_id: "" },
    person: { dni: "", nombre: "", apellidos: "", email: "", telefono: "" },
    app: { id: 0, client_id: "", client_url: "" },
  })
  const [error, setError] = useState<string>("")
  const iidPer = idper ? parseInt(idper) : 0
  const iidApp = idapp ? parseInt(idapp) : 0
  useEffect(() => {
    const url = AppConfig.API_BASE_URL + "personapp/" + idper + "/" + idapp
    const fetchPersonApp = async () => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
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
        setData(data as IPersonAppData)
      }
      setIsLoading(false)
    }
    if (iidPer && iidApp) {
      setIsLoading(true)
      fetchPersonApp()
    }
  }, [idper, idapp])

  return (
    <Container>
      <Row>
        <Col>
          {data.person && (
            <>
              <strong>
                <FaUser />{" "}
                <a href={`/person/${data.person.id}`}>
                  {data.person.nombre} {data.person.apellidos}
                </a>
              </strong>
              <br />
              <br />
            </>
          )}
        </Col>
        <Col>
          {data.app && (
            <>
              <strong>
                <FaAppStore />{" "}
                <a href={`/application/${data.app.id}`}>
                  {data.app.client_id}
                </a>{" "}
              </strong>
              {data.app.client_url}
              <br />
              <br />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              {data ? (
                <PersonApp {...{ data, setData, iidPer, iidApp }} />
              ) : (
                <Alert variant="danger">
                  <FaExclamationTriangle /> PersonApp not found
                </Alert>
              )}
            </>
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

export default PersonAppContainer
