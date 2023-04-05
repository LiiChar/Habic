import React from 'react'
import { useGetNameByNameQuery } from '../../Store/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
import { IActicles } from '../../types/acticles'
import { useGetArticleByNameQuery } from '../../Store/Slices/articlesSlice'
import { Article } from '../../Components/articles/Article'
import { setUser } from '../../Store/Slices/setUserSlice'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const name = useSelector((state: RootState) => state.setUser.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { data: user } = useGetNameByNameQuery(name.name);
    const {data: articles} = useGetArticleByNameQuery(name.name)

    const exit = () => {
        dispatch(setUser({name: 'Bot'}))
        sessionStorage.setItem('user', JSON.stringify('Bot'))
        navigate('/')
    }

    return (
        <div className='flex justify-center items-center '>
            <div style={{ borderRadius: '4px' }} className='w-2/3 h-3/4 m-8 border-2 border-solid border-sky-900'>
                <div className='m-4'>
                    <div>
                        <div>{user?.username}</div>
                        <div><button onClick={exit}>Выйти</button></div>
                    </div>
                    <div>
                        Ваши посты
                        {
                            articles?.map((article: IActicles) => (
                                <Article key={article.id} type='profile' article={article}></Article>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
