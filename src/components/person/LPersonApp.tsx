import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"

import { IPersonData, IPersonApp, IApplication } from "./types"

interface PersonAppProps {
  personapp: IPersonApp
  app: IApplication
}

const PersonApp = ({ personapp, app }: PersonAppProps) => {
  return (
    <ListGroup.Item>
      <Container>
        <Row>
          <Col>
            <strong>{app.client_id}</strong> {app.client_url}
            <small style={{ color: "gray" }}>
              <br />
              {dayjs(personapp.created_at).format("DD/MM/YYYY")}
            </small>
          </Col>
          <Col>
            <small>{personapp.profile && <>{personapp.profile}</>}</small>
          </Col>
          <Col md={1}>
            <span style={{ float: "right" }}>
              <a
                href={`/personapp/${personapp.person_id}/${personapp.auth_client_id}`}
              >
                Edit
              </a>
            </span>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

interface LPersonAppProps {
  data: IPersonData
}

const LPersonApp = ({ data }: LPersonAppProps) => {
  return (
    <Card>
      <Card.Header>Application Profiles</Card.Header>
      <ListGroup variant="flush">
        {data.lapp?.map((app) => (
          <PersonApp
            key={app.id}
            personapp={
              data.lpersonapp.find(
                (pa) => pa.auth_client_id === app.id
              ) as IPersonApp
            }
            app={app}
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default LPersonApp
