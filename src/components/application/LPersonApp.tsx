import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"

import { IApplicationData, IPersonApp, IPerson } from "./types"

interface PersonAppProps {
  personapp: IPersonApp
  per: IPerson
}

const PersonApp = ({ personapp, per }: PersonAppProps) => {
  return (
    <ListGroup.Item>
      <Container>
        <Row>
          <Col>
            <strong>
              {per.apellidos}, {per.nombre}
            </strong>{" "}
            {per.dni} {per.email}
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
  data: IApplicationData
}

const LPersonApp = ({ data }: LPersonAppProps) => {
  return (
    <Card>
      <Card.Header>Persons Profiles</Card.Header>
      <ListGroup variant="flush">
        {data.lper?.map((per) => (
          <PersonApp
            key={per.id}
            personapp={
              data.lpersonapp.find(
                (pa) => pa.person_id === per.id
              ) as IPersonApp
            }
            per={per}
          />
        ))}
      </ListGroup>
    </Card>
  )
}

export default LPersonApp
