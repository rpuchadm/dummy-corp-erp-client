import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppConfig from "../../AppConfig"
import { IApplicationData } from "./types"
import Application from "./Application"
import LPersonApp from "./LPersonApp"

const ApplicationContainer = ({}) => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IApplicationData>({
    application: { client_id: "", client_url: "", client_url_callback: "" },
    lpersonapp: [],
    lper: [],
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const url = AppConfig.API_BASE_URL + "application/" + id
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
        setData(data as IApplicationData)
      }
      setIsLoading(false)
    }
    const iid = id ? parseInt(id) : 0
    if (iid) {
      setIsLoading(true)
      fetchApplication()
    }
  }, [id])

  return (
    <Container>
      <Row>
        <Col>
          {isLoading || !data ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              {" "}
              {data && data.application ? (
                <Application {...{ data, setData }} />
              ) : (
                <Alert variant="danger">
                  <FaExclamationTriangle /> Application not found
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
        {data && data.lpersonapp?.length && data.lper?.length && (
          <Col>
            <LPersonApp data={data} />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default ApplicationContainer
