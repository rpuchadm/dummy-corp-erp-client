interface IApplication {
  id: number
  client_id: string
  client_url: string
  client_url_callback?: string
}
interface IPerson {
  id?: number
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  created_at?: string
}
interface IPersonApp {
  auth_client_id: number
  person_id: number
  profile: string
  id?: number
  created_at?: string
}
interface IPersonAppData {
  personapp: IPersonApp
  person: IPerson
  app: IApplication
}

export interface IPersonAppSessionResponse {
  code: string
}

export { IApplication, IPerson, IPersonApp, IPersonAppData }
