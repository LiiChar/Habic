
import React from 'react'
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../Store/Slices/commentSlie';
import { IComment } from '../types/acticles';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

interface IProps {
    props: IComment
    value: string;
    isInput: any;
    IsInpuy: any;
}

export const FallDownList: React.FC<IProps> = React.memo((comment) => {
    const [vision, setVision] = React.useState<boolean>(false);
    const [isChange, setChange] = React.useState<boolean>(false);

    const [updateCom] = useUpdateCommentMutation()
    const [deleteCom] = useDeleteCommentMutation()

    const user = useSelector((state: RootState) => state.setUser.user)


    const updateComment = () => {
        setChange((prev) => prev = !prev)
        comment.isInput(comment.props.text, comment.props.id)
        setVision(false)
    }

    const change = () => {
        updateCom({ id: comment.props.id, text: comment.value })
        comment.IsInpuy(null);
        setVision(false)
        setChange(false)
    }
    

    if (comment.props.author !== user.name) {
        return (<div style={{ display: 'none' }}></div>)
    } else {

        return (
            <>

                {vision &&
                    <div className='absolute'>
                        <div onClick={() => deleteCom({ id: comment.props.id })}>Удалить</div>
                        <div onClick={() => updateComment()}>Изменить</div>
                    </div>
                }
                {!isChange ?
                    !vision && <div className='flex items-center' onClick={() => setVision(true)}>...</div>
                    :
                    <div className='absolute'>
                        <button onClick={() => change()}>изменить</button>
                    </div>
                }
            </>
        )
    }

})
