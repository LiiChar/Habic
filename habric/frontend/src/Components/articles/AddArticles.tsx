import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateArticleMutation } from '../../Store/Slices/articlesSlice'
import { RootState } from '../../Store/store'
import { setVision } from '../../Store/Slices/setUserSlice'
import { Targs } from '../Targs'

export const AddArticles = () => {
    const [name, setName] = React.useState<string>('')
    const [text, setText] = React.useState<string | undefined>('')
    const [tags, setTags] = React.useState<string[]>([])
    const user = useSelector((state: RootState) => state.setUser.user)
    const dispatch = useDispatch()

    const [addArticles] = useCreateArticleMutation()

    const ref = React.useRef<HTMLTextAreaElement>(null)

    function publishing(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        addArticles({ author: user.name, name, tags: tags.join(', '), text: text || '' })
        dispatch(setVision(false))
    }

    function changeTags(tag:string) {
        setTags([...tags, tag])
    }

    return (
        <div onClick={() => dispatch(setVision(false))} className='fixed top-0 w-full h-full bg-slate-500 bg-opacity-50 flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='w-2/3 h-4/5 bg-white p-4'>
                <div>
                    <textarea  maxLength={150} autoFocus required className='outline-none resize-none' value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите тему'></textarea>
                </div>
                <div>
                    <textarea required ref={ref} value={text} onChange={() => setText(ref.current?.value)} className='w-full h-96 outline-none resize-none'></textarea>
                </div>
                <div className='flex flex-row justify-between'>
                    <button type={'submit'} onClick={(e) => publishing(e)}>Выложить</button>
                    <Targs tags={tags} setTags={changeTags}></Targs>
                </div>
            </div>
        </div>
    )
}
