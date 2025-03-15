interface IPerson {
  id?: number
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  created_at?: string
}

interface IApplication {
  id: number
  client_id: string
  client_url: string
}

interface IPersonApp {
  id: number
  person_id: number
  auth_client_id: number
  created_at: string
  profile: any
}

interface IPersonData {
  person: IPerson
  lpersonapp: IPersonApp[]
  lapp: IApplication[]
}

export { IApplication, IPerson, IPersonApp, IPersonData }
