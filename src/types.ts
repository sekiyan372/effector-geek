export type article = {
  id: number
  image: File
  artist: string
  band: string
  createdAt: Date
}

export type effector = {
  id: string
  name: string
  brand: string
  number: string
  position: number
  type: string
  ariticleId: article['id']
  createdAt: Date
}
