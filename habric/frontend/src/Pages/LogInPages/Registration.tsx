import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  useFetchAllUsersQuery, useCreateUsersMutation, IAddUser } from '../../Store/Slices/userSlice';

export const Registration = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [isExistUser, setIsExistUser] = React.useState<boolean>(true)
  const navigate = useNavigate()

  const {data: users} = useFetchAllUsersQuery()
  const [createUsers, {isSuccess}] = useCreateUsersMutation()

  function setLogin() {
    const thisUser = users?.find((user) => user.username === username && user.password === password)
    if (!thisUser) {
      const users = {username: username, password: password}
      createUsers(users)
      if (isSuccess ) {
        navigate('/login')
      }
    } else {
      setIsExistUser(true)
    }
  }

  return (
    <div className='flex justify-center items-center '>
      <div style={{ borderRadius: '4px' }} className='w-1/3 h-1/4 m-8 border-2 border-solid border-sky-900'>
        <div className='m-4'>
          <div>
            {isExistUser &&
              <div className='text-xs mt-2'>Ошибка, измените логин или пароль, или <Link className='font-bold' to={'/login'}>войдите</Link></div>
            }
          </div>
          <div>
            <div className='text-xs'>Логин</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none mb-3 w-full' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <div className='text-xs'>Пароль</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none w-full mb-2' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='mb-2 '>
            <button style={{ borderRadius: '4px' }} className='bg-cyan-500 hover:bg-cyan-700 p-2' onClick={setLogin}>Зарегестрироваться</button>
          </div>
          <div className='text-sm'>Усли у вас есть аккаунта? <Link className='font-bold' to={'/login'}>войдите</Link></div>
        </div>
      </div>
    </div>
  )
}
