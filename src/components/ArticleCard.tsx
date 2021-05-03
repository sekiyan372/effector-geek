import { VFC } from 'react'
import { useSelector } from 'react-redux'
import { getArticleById } from '~/store'
import { Article } from '~/types'

type Props = {
  articleId: Article['id']
}

const articleCard: VFC<Props> = (props) => {
  const article = useSelector(getArticleById(props.articleId))

  return (
    <div className="p-2 m-2 w-80 border border-solid">
      <img src={article.imageUrl} alt={`${article.artist}のエフェクターボード`} />
      <div>{article.artist}</div>
      <div>{article.band}</div>
    </div>
  )
}

export default articleCard
