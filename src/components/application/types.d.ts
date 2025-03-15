interface IApplication {
  id?: number
  client_id: string
  client_url: string
  client_url_callback?: string
  client_secret?: string
  created_at?: string
}

interface IApplicationData {
  application: IApplication
}

export { IApplication, IApplicationData }
