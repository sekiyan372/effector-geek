import { NextPage } from 'next'
import Head from '~/components/Head'
import Heading from '~/components/Heading'

const Contact: NextPage = () => {
  return (
    <>
      <Head title="お問い合わせ" />
      <section className="m-8 sm:m-12">
        <Heading>お問い合わせ</Heading>
        <p>ご質問・ご意見・ご要望などありましたらお気軽にご記入ください。</p>
        <iframe
          className="mx-auto mt-10 h-260 sm:h-200 w-full"
          src="https://docs.google.com/forms/d/e/1FAIpQLScz6gKisEEJ4ZTnIYyum1MIY32D7SMaSNl6lOgcJPgc67Do8A/viewform?embedded=true"
        >
          読み込んでいます…
        </iframe>
      </section>
    </>
  )
}

export default Contact
