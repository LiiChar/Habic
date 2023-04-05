import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../Store/Slices/setUserSlice'
import { useFetchAllUsersQuery, useGetNameByTokenMutation, useLoginUserMutation } from '../../Store/Slices/userSlice'
import { RootState } from '../../Store/store'

export const Login = () => {
  const [name, setName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const jwtToken = useSelector((state: RootState) => state.setUser.jwtToken)
  const [error, setError] = React.useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, {isSuccess, isError, data}] = useLoginUserMutation()

  React.useEffect(() => {
    if(sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user') || '') !== 'Bot') {
      dispatch(setUser({ name: JSON.parse(sessionStorage.getItem('user') || '') || 'Bot'}))
      sessionStorage.setItem('user', JSON.stringify(JSON.parse(sessionStorage.getItem('user') || '')));
      navigate('/')
    }
  }, [])
  
  
  async function setLogin() {
    if (name !== '' && password !== '') {
      const user: any = await loginUser({username: name, password: password, jwtToken})
      if (user?.error) {
        setError(user?.error.data.message)
      }
      
      if (user?.error?.originalStatus === 200) {
        dispatch(setUser({ name }))
        sessionStorage.setItem('token', JSON.stringify(user?.error?.data));
        sessionStorage.setItem('user', JSON.stringify(name));
        navigate('/')
      }
    }
  }



  return (
    <div className='flex justify-center items-center '>
      <div style={{ borderRadius: '4px' }} className='w-1/3 h-1/4 m-8 border-2 border-solid border-sky-900'>
        <div className='m-4'>
            <div>
            {error &&
              <div className='text-xs mt-2 text-red-500'><b> {error ?? ''}</b></div>
            }
            </div>
          <div>
            <div className='text-xs'>Логин</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none mb-3 w-full' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className='text-xs'>Пароль</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none w-full mb-2' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='mb-2 '>
            <button style={{ borderRadius: '4px' }} className='bg-cyan-500 hover:bg-cyan-700 p-2' onClick={setLogin}>Войти</button>
          </div>
          <div className='text-sm'>У вас нет аккаунта? <Link className='font-bold' to={'/register'}>зарегестрируйтесь</Link></div>
        </div>
      </div>
    </div>
  )
}
