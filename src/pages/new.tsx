import { NextPage } from 'next'
import Head from '~/components/Head'

const New: NextPage = () => {
  return(
    <>
      <Head title="エフェクターボード投稿" />
      <div className="m-12">
        <h2>新規投稿</h2>
      </div>
    </>
  )
}

export default New
