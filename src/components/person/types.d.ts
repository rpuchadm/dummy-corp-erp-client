interface IPerson {
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

interface IPersonList extends IPerson {
  id: number
  created_at: string
}

export { IPerson, IPersonList }
