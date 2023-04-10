import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateCommentMutation, useFetchAllCommentsQuery } from '../../Store/Slices/commentSlie';
import { RootState } from '../../Store/store'
import { useFetchAllUsersQuery, useGetNameByNameQuery } from '../../Store/Slices/userSlice';

interface Value {
    value: string,
    setValue: any
}

interface IProps {
    idef?: number | null;
    author: string;
    text: Value;
    
}

export const AnswerComment: React.FC<IProps> = (props) => {
    const [vision, setVision] = React.useState<boolean>(false)
    // const [answerer, setAnswer] = React.useState<string>('')
    const user = useSelector((state: RootState) => state.setUser.user)

    const {data: store } = useFetchAllCommentsQuery()
    const [addComment, {isSuccess}] = useCreateCommentMutation()

    const AnswerComments = store?.filter((com) => props.idef === com.to)

    function addAnswer() { 

        addComment({ author: user.name, text: props.text.value, to: Number(props?.idef) })
        if (isSuccess) {

            props.text.setValue('')
        }
    }


    return (
        <>
            <button onClick={() => setVision(!vision)}>
                Ответы
            </button>
            {vision &&
                <div className='ml-6 w-full'>
                    {user.name !== props.author && <div>
                        <input style={{ border: '1px solid blue', borderRadius: "4px" }} className='outline-none' type="text" value={props.text.value} onChange={(e) => props.text.setValue(e.target.value)} />
                        <button onClick={() => addAnswer()}>Отправить</button>
                    </div>}
                    {
                        AnswerComments?.map((answer) => (
                            <div key={answer.id}>
                                <div className='ml-2 text-sm'>
                                    <span className='font-bold '>{answer.author}</span>
                                    <span className='ml-2'>сейчас</span>
                                </div>
                                <pre>{answer.text}</pre>
                                <AnswerComment text={{value: props.text.value, setValue: props.text.setValue}}  idef={answer.id} author={answer.author}/>
                            </div>
                        ))
                    }
                </div >
            }
        </>

    )
}
