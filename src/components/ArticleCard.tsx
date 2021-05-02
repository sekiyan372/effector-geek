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
    <div>
      <div>{article.artist}</div>
      <div>{article.band}</div>
    </div>
  )
}

export default articleCard
