import { useEffect, useState } from "react"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Spinner from "react-bootstrap/esm/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppConfig from "../../AppConfig"
import AuthIni from "./AuthIni"
import { IAuthIniData } from "./types"
import { Alert } from "react-bootstrap"

const AuthIniContainer = () => {
  // /auth/?client_id=CRM&redirect_uri=https%3A%2F%2Fcrm.mydomain.com%2Fauthback%2F%3Fcode%3D
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)
  const client_id = searchParams.get("client_id")
  const redirect_uri = searchParams.get("redirect_uri")

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IAuthIniData>({
    application: { client_id: "", client_url: "", client_url_callback: "" },
    lper: [],
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const url = AppConfig.API_BASE_URL + "authini/" + client_id
    const fetchApplication = async () => {
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
        setData(data as IAuthIniData)
      }
      setIsLoading(false)
    }

    setIsLoading(true)
    fetchApplication()
  }, [client_id])

  if (!client_id || !redirect_uri) {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="danger">
              <Alert.Heading>
                <FaExclamationTriangle />
                Error
              </Alert.Heading>
              <p>Invalid parameters</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          {isLoading || !data ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              {data && data.application ? (
                <AuthIni {...{ client_id, redirect_uri, data }} />
              ) : (
                <Card>
                  <Card.Header>
                    <FaExclamationTriangle />
                    Error
                  </Card.Header>
                  <Card.Body>
                    <p>{error}</p>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
          <br />
        </Col>
      </Row>
    </Container>
  )
}

export default AuthIniContainer
