import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../Store/Slices/setUserSlice'
import { useFetchAllUsersQuery } from '../../Store/Slices/userSlice'

export const Login = () => {
  const [name, setName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [isExistUser, setIsExistUser] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data: users} = useFetchAllUsersQuery()

  
  
  
  function setLogin() {
    const thisUser = users?.find((user) => user.name === name && user.password === String(password))
    console.log(thisUser);
    if (thisUser) {
      dispatch(setUser({ id: thisUser.id, name }))
      navigate('/')
    } else {
      setIsExistUser(false)
    }
  }



  return (
    <div className='flex justify-center items-center '>
      <div style={{ borderRadius: '4px' }} className='w-1/3 h-1/4 m-8 border-2 border-solid border-sky-900'>
        <div className='m-4'>
            <div>
              {!isExistUser &&
                <div className='text-xs mt-2'>Ошибка, измените логин или пароль, или <Link className='font-bold' to={'/register'}>зарегестрируйтесь</Link></div>
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
