import { NextPage } from 'next'
import Head from '~/components/Head'
import Heading from '~/components/Heading'

const About: NextPage = () => {
  return (
    <>
      <Head title="Effector Geekとは？" />
      <section className="m-12">
        <Heading>Effector Geekとは？</Heading>
        <div className="m-5">
          <p>このサイトはエフェクター好きによる、エフェクター好きのための、エフェクター情報共有サイトです。</p>
          <p>エフェクター情報を登録したり、自分のエフェクターボードを共有できます。</p>
          <div className="mt-5">
            <p>
              このサイトは
              <a href="https://twitter.com/sekiyan372" className="text-blue-500">個人</a>
              が管理・運営を行っております。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
