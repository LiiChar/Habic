import React from 'react'
import { useFetchAllCommentsQuery } from '../../Store/Slices/commentSlie'
import { RootState } from '../../Store/store'
import { IComment } from '../../types/acticles'
import { AnswerComment } from './AnswerComment'

interface IProps {
  idef?: number | null
}

export const Comments: React.FC<IProps> = (props) => {
  const {data: store} = useFetchAllCommentsQuery()

  const comments = store?.filter((com) => props.idef === com.to)

  return (
    <div className='w-full'>
      {comments?.map((com) => (
        <div key={com.id}>
          <div>
            <div className='ml-2 text-sm'>
              <span className='font-bold '>{com.author}</span>
              <span className='ml-2'>сейчас</span>
            </div>
            <div>{com.text}</div>
          </div>
          <div>
            <span className='ml-2 mr-4'>0</span>
            <AnswerComment idef={com.id} author={com.author} />
          </div>
        </div>
      ))}
    </div>
  )
}
