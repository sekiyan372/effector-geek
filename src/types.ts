export type Article = {
  id: string
  image?: File
  artist: string
  band?: string
  createdAt: Date
}

export type Effector = {
  id: string
  name: string
  brand: string
  number: string
  position: number
  type: string
  ariticleId: Article['id']
  createdAt: Date
}
