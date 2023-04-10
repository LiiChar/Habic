import React from 'react'
import { useFetchAllCommentsQuery } from '../../Store/Slices/commentSlie'
import { RootState } from '../../Store/store'
import { IComment } from '../../types/acticles'
import { AnswerComment } from './AnswerComment'
import changeTimeFromDB from '../../utils/changeTimeFromDB'
import { FallDownList } from '../FallDownList'
import { useSelector } from 'react-redux'
import { useFetchAllUsersQuery } from '../../Store/Slices/userSlice'
import { ImageUser } from '../ImageUser'

interface IProps {
  idef?: number | null
}

export const Comments: React.FC<IProps> = (props) => {
  const {data: store} = useFetchAllCommentsQuery()
  
  const [answerer, setAnswer] = React.useState<string>('')
  const [isInput, setIsInput] = React.useState<number | null>()

  const comments = store?.filter((com) => props.idef === com.to);
  
  const handleIsInput = (text: string, id: number): void => {
    setIsInput(id);
    setAnswer(text);
  }
  
  return (
    <div className='w-full'>
      {comments?.map((com) => (
        <div key={com.id}>
          <div>
            <div className='ml-2 text-sm flex flex-row'>
              <ImageUser user={com.author} heigth={'50'} width={'50'}/>
              <div className='font-bold '>{com.author}</div>
              <div className='ml-2 text-slate-500 text-xs'>{changeTimeFromDB(com.updatedAt)}</div>
              <div><FallDownList IsInpuy={setIsInput} isInput={handleIsInput} value={answerer} props={com}/></div>
            </div>
            { isInput !== com.id ?
            
            <pre>{com.text}</pre>
            :
            <input type="text" value={answerer} onChange={(e) => setAnswer(e.target.value)}/>
            }
          </div>
          <div>
            <span className='ml-2 mr-4'>0</span>
            <AnswerComment  text={{value: answerer, setValue: setAnswer}} idef={com.id} author={com.author} />
          </div>
        </div>
      ))}
    </div>
  )
}
