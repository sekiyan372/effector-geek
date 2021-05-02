import { Article } from '~/types'
import { firestore } from '~/utils/firebase'

export const articleConverter: firebase.default.firestore.FirestoreDataConverter<Article> = {
  toFirestore(
    value: Pick<Article, 'artist' | 'band' >
  ) {
    return {
      artist: value.artist,
      band: value.band,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(doc): Article {
    const data = doc.data()
    return {
      id: doc.id,
      artist: data.artist,
      band: data.band,
      createdAt: data.createdAt,
    }
  }
}
