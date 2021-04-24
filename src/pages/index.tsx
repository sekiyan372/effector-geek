import { NextPage } from 'next'
import { useEffect } from 'react'
import { db } from '~/utils/firebase'

const Index: NextPage = () => {
  useEffect(() => {
    db().collection("articles").get().then((query) => {
      query.forEach((doc) => {
        console.log(doc.data())
      })
    })
    db().collection("articles").doc("Zzhm2BUjdD09Vcc2acd9").collection("effectors").get().then((query) => {
      query.forEach((doc) => {
        console.log(doc.data())
      })
    })
  }, [])

  return (
    <div className="m-12">
      <h1>新着ボード</h1>
    </div>
  )
}

export default Index
