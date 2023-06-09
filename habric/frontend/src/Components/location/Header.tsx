import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setVision } from '../../Store/Slices/setUserSlice'
import { RootState } from '../../Store/store'
import { useGetImageByNameQuery, useGetNameByNameQuery } from '../../Store/Slices/userSlice'
import { ImageUser } from '../ImageUser'

export const Header = memo( function() {
  const user = useSelector((state: RootState) => state.setUser.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <div className='w-full h-10 bg-cyan-800'>
      <div className='flex flex-row justify-around items-center h-full text-white'>
        <div>
          <Link to={'/'} className='text-3xl'>Бигбо</Link>
        </div>
        <div>
          {user.name !== 'Bot' ? <div className='cursor-pointer' onClick={() => navigate('/profile')}>{user.name}</div> : <Link to={'/login'}>Войти</Link>}
        </div>
        <div>
          <button onClick={() => dispatch(setVision(true))}>Добавить запись</button>
        </div>
      </div>
    </div>
  )
})
