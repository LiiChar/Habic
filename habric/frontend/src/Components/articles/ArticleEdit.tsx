import React from 'react'
import {  useSelector } from 'react-redux'
import {  useDeleteArticleMutation, useGetArticleByIdQuery, useUpdateArticleMutation } from '../../Store/Slices/articlesSlice'
import { RootState } from '../../Store/store'
import { Targs } from '../Targs'
import { useNavigate, useParams } from 'react-router-dom'

export const ArticleEdit = () => {
    const [name, setName] = React.useState<string>('')
    const [text, setText] = React.useState<string | undefined>('')
    const [tags, setTags] = React.useState<string[]>([])
    const user = useSelector((state: RootState) => state.setUser.user)
    
    let {id} = useParams()
    
    const {data} = useGetArticleByIdQuery(id)

    const navigate = useNavigate()

    React.useEffect(() => {
        setName(data?.name || '')
        setText(data?.text || '')
        let setTages = data?.tags.split(' ')
        setTags(setTages || [])
    }, [data])
    
    const [updateArticle] = useUpdateArticleMutation()
    const [delArtilcle] = useDeleteArticleMutation()


    const ref = React.useRef<HTMLTextAreaElement>(null)

    function update(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        updateArticle({id: Number(id) || 1, author: user.name, name, tags: tags.join(' '), text: text || '' })
        navigate(`/artic/${id}`)
    }

    function deleteArticle() {
        delArtilcle(id)
        navigate(`/`)
    }

    function changeTags(tag:string) {
        setTags([...tags, tag])
    }


    

    return (
        <div className='top-0 w-full h-full flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='w-2/3 h-4/5 bg-white p-4'>
                <div>
                    <textarea   maxLength={150} autoFocus required className='outline-none resize-none' value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите тему'></textarea>
                </div>
                <div>
                    <textarea wrap={'soft'} required ref={ref} value={text} onChange={() => setText(ref.current?.value)} className='w-full h-96 outline-none resize-none'></textarea>
                </div>
                <div className='flex flex-row justify-between'>
                    <button type={'submit'} onClick={(e) => update(e)}>Выложить</button>
                    <button type={'button'} onClick={deleteArticle}>Удалить</button>
                    <Targs tags={tags} setTags={changeTags}></Targs>
                </div>
            </div>
        </div>
    )
}
