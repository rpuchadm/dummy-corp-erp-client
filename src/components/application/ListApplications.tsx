import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"

import AppConfig from "../../AppConfig"

import { IApplication } from "./types"

const ListApplications = () => {
  const [applications, setApplications] = useState<IApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = AppConfig.API_BASE_URL + "applications"
    const fetchApplications = async () => {
      const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json()
      setApplications(data)
      setLoading(false)
    }

    fetchApplications()
  }, [])

  return (
    <>
      <h1>List Applications</h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/application/0">New Application</a>
      </p>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ListGroup>
          {applications?.map((application) => (
            <ListGroup.Item key={application.id}>
              <Card>
                <Card.Header>
                  Application #{application.id} -{" "}
                  {dayjs(application.created_at).format("DD/MM/YYYY HH:mm")}
                  <a
                    href={`/application/${application.id}`}
                    style={{ float: "right" }}
                  >
                    Edit
                  </a>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{application.client_id}</Card.Title>
                  <Card.Text>{application.client_url}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Created at{" "}
                    {dayjs(application.created_at).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </small>
                </Card.Footer>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}

export default ListApplications
