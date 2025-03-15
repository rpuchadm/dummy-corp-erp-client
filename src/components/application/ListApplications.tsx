import { Fragment, useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner"

import AppConfig from "../../AppConfig"

import { IApplication } from "./types"
import { FaAppStore } from "react-icons/fa"

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
      const data = await response.json().then((data) => data as IApplication[])
      setApplications(data)
      setLoading(false)
    }

    fetchApplications()
  }, [])

  return (
    <>
      <h1>
        <FaAppStore /> List Applications
      </h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/application/0">New Application</a>
      </p>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <>
          {applications?.map((application) => (
            <Fragment key={application.id}>
              <Card>
                <Card.Header>
                  Application #{application.id}
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
                  <small style={{ color: "gray" }}>
                    Created {dayjs(application.created_at).format("DD/MM/YYYY")}
                  </small>
                </Card.Footer>
              </Card>
              <br />
            </Fragment>
          ))}
        </>
      )}
    </>
  )
}

export default ListApplications
