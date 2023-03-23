import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Comments } from '../../Components/comments/Comments'
import { useFetchAllArticlesQuery } from '../../Store/Slices/articlesSlice'
import { useCreateCommentMutation } from '../../Store/Slices/commentSlie'
import { RootState } from '../../Store/store'

export const ArticlesPage = () => {
  const {data: articles} = useFetchAllArticlesQuery()
  const { id } = useParams()
  const article = articles?.find((article) => article.id === Number(id))
  const user = useSelector((state: RootState) => state.setUser.user)

  const [addComment, {isSuccess} ] = useCreateCommentMutation()

  const [comment, setComment] = React.useState<string>('')

  function sendComment() {
    addComment({ author: user.name, text: comment, to: Number(article?.id) })
    if (isSuccess) {

      setComment('')
    }
  }

  return (
    <>
      <div className='m-5 border-2 border-solid border-sky-900'>
        <div className='m-4'>
          <div>{article?.author}</div>
          <div className='my-2 text-lg'><b>{article?.name}</b></div>
          <div className='text-xs mb-2'>{article?.tags}</div>
          <div>
            {article?.text}
          </div>
        </div>
      </div>
      <div className='m-5 border-2 border-solid border-sky-900'>
        <div className='m-4'>
          <div>
            <div className='mb-4 font-bold'>Коментарии</div>
            <div className='mb-6'>
              <div className='text-xs'>Ваш комментарий</div>
              <textarea value={comment} style={{ border: '1px solid blue', borderRadius: "4px" }} className='h-32 outline-none resize-none w-full' onChange={(e) => setComment(e.target.value)}  ></textarea>
              <div>
                <button onClick={sendComment}>Отправить</button>
              </div>
            </div>
          </div>
          <Comments idef={article?.id} />
        </div>
      </div>
    </>
  )
}
