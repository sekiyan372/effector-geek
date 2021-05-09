import Document, {Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body className="min-h-screen relative pb-4">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
