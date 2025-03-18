import Card from "react-bootstrap/Card"

import Alert from "react-bootstrap/Alert"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { FaBomb, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

import { IAuthIniData, IPerson, IPersonApp } from "./types"
import { Badge } from "react-bootstrap"

interface AuthIniPersonProps {
  application_id: number
  per: IPerson
  personapp?: IPersonApp
}

const AuthIniPerson = ({
  application_id,
  per,
  personapp,
}: AuthIniPersonProps) => {
  return (
    <Col key={per.id}>
      <a href={`/personapp/${per.id}/${application_id}`}>
        {per.apellidos} {per.nombre}
      </a>{" "}
      {personapp ? (
        <Badge bg="success" pill>
          <FaCheckCircle />
        </Badge>
      ) : (
        <FaTimesCircle />
      )}
      {personapp?.profile && (
        <small>
          <pre>{personapp.profile}</pre>
        </small>
      )}
    </Col>
  )
}

interface AuthIniProps {
  client_id: string
  redirect_uri: string
  data: IAuthIniData
}

const AuthIni = ({ client_id, redirect_uri, data }: AuthIniProps) => {
  if (data.application.client_id !== client_id) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Authentication Initialazer Error</Alert.Heading>
        <p>
          <FaBomb size={25} /> El client_id <strong>{client_id}</strong> no
          coincide con el registrado en la aplicación.
        </p>
      </Alert>
    )
  }
  if (data.application.client_url_callback !== redirect_uri) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Authentication Initialazer Error</Alert.Heading>
        <p>
          <FaBomb size={25} /> El redirect_uri <strong>{redirect_uri}</strong>{" "}
          no coincide con el registrado en la aplicación.
        </p>
      </Alert>
    )
  }

  return (
    <>
      <Card>
        <Card.Header>Authentication Initialazer</Card.Header>
        <Card.Body>
          <p>
            Ha sido redirigido a esta página desde la aplicación{" "}
            <strong>{client_id}</strong> para iniciar el proceso de
            autenticación.
          </p>

          <p>
            <small>
              client_id: {client_id} redirect_uri: {redirect_uri}
            </small>
          </p>

          <p>
            Normalmente se presentaría un formulario para ingresar usuario y
            contraseña, pero en este caso vamos a presentar un listado de
            usuarios para que elija con quien quiere iniciar sesión.
          </p>

          <hr />

          <p>
            <strong>Seleccione un usuario para iniciar sesión:</strong>
          </p>
          <Container>
            <Row>
              {data.lper.map((per) => (
                <AuthIniPerson
                  key={per.id}
                  application_id={data.application.id}
                  personapp={data.lpersonapp?.find(
                    (pa) => pa.person_id === per.id
                  )}
                  per={per}
                />
              ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  )
}

export default AuthIni
