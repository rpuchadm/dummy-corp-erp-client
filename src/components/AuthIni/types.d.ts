interface IApplication {
  id?: number
  client_id: string
  client_url: string
  client_url_callback?: string
  client_secret?: string
  created_at?: string
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
  id: number
  person_id: number
  auth_client_id: number
  created_at: string
  profile: any
}
interface IAuthIniData {
  application: IApplication
  lper: IPerson[]
  lpersonapp?: IPersonApp[]
}
export { IAuthIniData, IApplication, IPerson, IPersonApp }
