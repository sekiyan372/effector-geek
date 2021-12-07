import dayjs from 'dayjs'
import { VFC } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { getArticleById } from '~/store'
import { Article } from '~/types'

type Props = {
  articleId: Article['id']
}

const ArticleCard: VFC<Props> = (props) => {
  const article = useSelector(getArticleById(props.articleId))

  return (
    <Link href={`/boards/${article.id}`}>
      <div className="p-2 m-2 max-w-xs border-2 border-solid border-green-500 rounded cursor-pointer hover:bg-gray-200 focus:outline-none focus:shadow-outline">
        <img src={ article.imageUrl } alt={`${ article.artist }のエフェクターボード`} />
        <div className="m-3 text-center border-b border-green-500">
          { article.artist }{ article.band !== '' && ` (${ article.band })` }
        </div>
        <div>
          { dayjs(article.createdAt).format('YYYY/MM/DD HH:mm') } 投稿
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
