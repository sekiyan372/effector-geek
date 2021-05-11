import { Article, Effector } from '~/types'
import { firestore } from '~/utils/firebase'

export const articleConverter: firebase.default.firestore.FirestoreDataConverter<Article> = {
  toFirestore(
    value: Pick<Article, 'artist' | 'band' | 'imageUrl'>
  ) {
    return {
      imageUrl: value.imageUrl,
      artist: value.artist,
      band: value.band,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(doc): Article {
    const data = doc.data()
    return {
      id: doc.id,
      imageUrl: data.imageUrl,
      artist: data.artist,
      band: data.band,
      createdAt: data.createdAt.toDate().toString(),
    }
  }
}

export const effectorConverter: firebase.default.firestore.FirestoreDataConverter<Effector> = {
  toFirestore(
    value: Pick<Effector, 'brand' | 'imageUrl' | 'name' | 'type'>
  ) {
    return {
      imageUrl: value.imageUrl,
      name: value.name,
      brand: value.brand,
      type: value.type,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(doc): Effector {
    const data = doc.data()
    return {
      id: doc.id,
      imageUrl: data.imageUrl,
      name: data.name,
      brand: data.brand,
      type: data.type,
      createdAt: data.createdAt.toDate().toString(),
    }
  }
}
