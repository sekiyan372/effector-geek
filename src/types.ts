export type Article = {
  id: string
  imageUrl: string
  artist: string
  band: string
  effectorIds: {id: string}[]
  createdAt: Date
}

export type Effector = {
  id: string
  imageUrl: string
  name: string
  brand: string
  type: string
  createdAt: Date
}
